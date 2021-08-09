import SocketResponseHandler from './SocketResponseHandler';
import PriceConstants from '../../constants/Price/PriceConstants';
import * as sharedService from '../Shared/SharedServices';
// import ChartConstants from '../../../../../ua-kernal/models/chart/chart-constants';
import utils from '../../util/utils/utils';
import AppConfig from '../config/AppConfig';
import TinyQueue from 'tinyqueue';
// import languageDataStore from '../../../../../ua-kernal/models/shared/language/language-data-store';
// import reduxStore from '../../../../../utils/reduxStore';
// import PriceUser from '../../business-entities/price-user';
// import { saveUser } from '../../../../actions/UserActions';
// import { setLoginStatus, saveExchange, saveStock, saveCurrentExchange } from '../../../../actions';


export default class PriceSocketResponseHandler extends SocketResponseHandler{
    constructor(callbacks) {
        super(callbacks);
        let that = this;
        this.callbacks = callbacks;
        this.inputQueue = new TinyQueue();
        this.processTimer = setTimeout(function () {
            that.processResponse();
        }, PriceConstants.TimeIntervals.WebSocketInQueueProcessingInterval);

    }

    /* *
     * Processes message frames from the server
     */
    _processMessage (message, onSocketReady) {
        // Fetch the response message type
        let type = message[PriceConstants.ResponseType.MessageType];

        let callbackResponse = this.callbacks.callbacks;

        switch (type) {
            case PriceConstants.ResponseType.Data.ResponseEquity:
                    this._processStockResponse(message);

                break;

            case PriceConstants.ResponseType.Data.ResponseIndex:
                this._processIndexResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseExchange:
                this._processExchangeResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseMarketDepthByPrice:
                this._processMarketDepth(message, PriceConstants.MarketDepthType.DepthByPrice);
                break;

            case PriceConstants.ResponseType.Data.ResponseMarketDepthByOrder:
                this._processMarketDepth(message, PriceConstants.MarketDepthType.DepthByOrder);
                break;

            case PriceConstants.ResponseType.Data.ResponseOHLC:
                this._processOHLCResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseTOVPOHLC:
                this._processTOPVOHLCResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseAnnouncement:
            case PriceConstants.ResponseType.Data.ResponseNews:
                this._processNewsAnnouncementResponse(message, type);
                break;

            case PriceConstants.ResponseType.Data.ResponseTopStocks:
                this._processTopStockResponse(message);
                break;

            case PriceConstants.ResponseType.Authentication:
                this._processAuthResponse(message, callbackResponse.auth, onSocketReady);
                break;

            case PriceConstants.ResponseType.Data.ResponseTimeAndSales:
                this._processTimeAndSalesResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseTimeAndSalesDetail:
                this._processTimeAndSalesResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseFullMarketEnd:
                this._processFullMarketEndResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseAlertHistory:
            case PriceConstants.ResponseType.Data.ResponseAlert:
                this._processAlertResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseAlertTrigger:
                this._processAlertTriggerResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseSubMarket:
                this._processSubMarketResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseXStream:
                this._processXStreamResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseFSBulk:
                this._processFSBulkResponse(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseChangePassword:
                this._processChangePassword(message);
                break;

            case PriceConstants.ResponseType.Data.ResponseProjectedPrice:
                this._processProjectedPriceResponse(message);
                break;

            case PriceConstants.ResponseType.Pulse:
                break;

            default:
                utils.logger.logWarning('Unsupported message type : ' + type);
                break;
        }
    }

    _processXStreamResponse (message) {
        let stockObj = sharedService.getService('price').stockDS.getStock(message.exg, message.sym, message.inst);

        if (stockObj !== null) {
            stockObj.setData(message);
        }
    }

    _processFSBulkResponse (message) {
        let stockObj = sharedService.getService('price').stockDS.getStock(message.exg, message.sym, message.inst);

        if (stockObj !== null) {
            stockObj.setData(message);
        }
    }

    _processStockResponse (message) {
        let key = utils.keyGenerator.getKey(message.exg, message.sym);
        let indexObj = sharedService.getService('price').stockDS.getStock(message.exg, message.sym, message.inst, undefined, message.symStat);

            const data = {
                [key]: {
                    sym : typeof message.sym !== 'undefined' ? message.sym :indexObj.sym,
                    symStat : typeof message.symStat !== 'undefined' ? message.symStat :indexObj.symStat,
                    lDes : typeof message.lDes !== 'undefined' ? message.lDes :indexObj.lDes,
                    sDes : typeof message.sDes !== 'undefined' ? message.sDes :indexObj.sDes,
                    dSym : typeof message.dSym !== 'undefined' ? message.dSym :indexObj.dSym,
                    exg : typeof message.exg !== 'undefined' ? message.exg :indexObj.exg,
                    inst:    typeof message.inst !== 'undefined' ? message.inst :indexObj.inst,
                    ast :   typeof message.ast !== 'undefined' ? message.ast :indexObj.ast,
                    cid :   typeof message.cid !== 'undefined' ? message.cid :indexObj.cid,
                    sec :   typeof message.sec !== 'undefined' ? message.sec :indexObj.sec,
                    subMkt: typeof message.subMkt !== 'undefined' ? message.subMkt :indexObj.subMkt,
                    open:    typeof message.open !== 'undefined' ? message.open :indexObj.open,
                    high:    typeof message.high !== 'undefined' ? message.high :indexObj.high,
                    low :   typeof message.low !== 'undefined' ? message.low :indexObj.low,
                    cls :   typeof message.cls !== 'undefined' ? message.cls :indexObj.cls,
                    chg :   typeof message.chg !== 'undefined' ? message.chg :indexObj.chg,
                    pctChg:  typeof message.pctChg !== 'undefined' ? message.pctChg :indexObj.pctChg,
                    prvCls:  typeof message.prvCls !== 'undefined' ? message.prvCls :indexObj.prvCls,
                    tovr:    typeof message.tovr !== 'undefined' ? message.tovr :indexObj.tovr,
                    vol :   typeof message.vol !== 'undefined' ? message.vol :indexObj.vol,
                    trades: typeof message.trades !== 'undefined' ? message.trades :indexObj.trades,
                    cur: typeof message.cur !== 'undefined' ? message.cur :indexObj.cur,
                    ltp: typeof message.ltp !== 'undefined' ? message.ltp :indexObj.ltp,
                    ltq: typeof message.ltq !== 'undefined' ? message.ltq :indexObj.ltq,
                    ltd: typeof message.ltd !== 'undefined' ? message.ltd :indexObj.ltd,
                    ltt: typeof message.ltt !== 'undefined' ? message.ltt :indexObj.ltt,
                    bap: typeof message.bap !== 'undefined' ? message.bap :indexObj.bap,
                    baq: typeof message.baq !== 'undefined' ? message.baq :indexObj.baq,
                    bbp: typeof message.bbp !== 'undefined' ? message.bbp :indexObj.bbp,
                    bbq: typeof message.bbq !== 'undefined' ? message.bbq :indexObj.bbq,
                    tbq: typeof message.tbq !== 'undefined' ? message.tbq :indexObj.tbq,
                    taq: typeof message.taq !== 'undefined' ? message.taq :indexObj.taq,
                    h52: typeof message.h52 !== 'undefined' ? message.h52 :indexObj.h52,
                    l52: typeof message.l52 !== 'undefined' ? message.l52 :indexObj.l52,
                    per: typeof message.per !== 'undefined' ? message.per :indexObj.per,
                    pbr: typeof message.pbr !== 'undefined' ? message.pbr :indexObj.pbr,
                    eps: typeof message.eps !== 'undefined' ? message.eps :indexObj.eps,
                    yld: typeof message.yld !== 'undefined' ? message.yld :indexObj.yld,
                    lot: typeof message.lot !== 'undefined' ? message.lot :indexObj.lot,
                    uSym: typeof message.uSym !== 'undefined' ? message.uSym :indexObj.uSym,
                    stkP: typeof message.stkP !== 'undefined' ? message.stkP :indexObj.stkP,
                    expDt: typeof message.expDt !== 'undefined' ? message.expDt :indexObj.expDt,
                    deci: typeof message.deci !== 'undefined' ? message.deci :indexObj.deci,
                    dcf: typeof message.dcf !== 'undefined' ? message.dcf :indexObj.dcf,
                    refValue: typeof message.refValue !== 'undefined' ? message.refValue :indexObj.refValue,
                    vwap: typeof message.vwap !== 'undefined' ? message.vwap :indexObj.vwap,
                    rng :typeof message.rng !== 'undefined' ? message.rng :indexObj.rng,
                    pctRng: typeof message.pctRng !== 'undefined' ? message.pctRng :indexObj.pctRng,
                    cshMp: typeof message.cshMp !== 'undefined' ? message.cshMp :indexObj.cshMp,
                    mktCap: typeof message.mktCap !== 'undefined' ? message.mktCap :indexObj.mktCap,
                    mktCapChg: typeof message.mktCapChg !== 'undefined' ? message.mktCapChg :indexObj.mktCapChg,
                    pctYtd: typeof message.pctYtd !== 'undefined' ? message.pctYtd :indexObj.pctYtd,
                    cit: typeof message.cit !== 'undefined' ? message.cit :indexObj.cit,
                    cot: typeof message.cot !== 'undefined' ? message.cot :indexObj.cot,
                    civ: typeof message.civ !== 'undefined' ? message.civ :indexObj.civ,
                    cov: typeof message.cov !== 'undefined' ? message.cov :indexObj.cov,
                    min: typeof message.min !== 'undefined' ? message.min :indexObj.min,
                    max: typeof message.max !== 'undefined' ? message.max :indexObj.max,
                    sMin: typeof message.sMin !== 'undefined' ? message.sMin :indexObj.sMin,
                    sMax: typeof message.sMax !== 'undefined' ? message.sMax :indexObj.sMax,
                    cor: typeof message.cor !== 'undefined' ? message.cor :indexObj.cor,
                    cof: typeof message.cof !== 'undefined' ? message.cof :indexObj.cof,
                    pcd: typeof message.pcd !== 'undefined' ? message.pcd :indexObj.pcd,
                    fVal: typeof message.fVal !== 'undefined' ? message.fVal :indexObj.fVal,
                    bor: typeof message.bor !== 'undefined' ? message.bor :indexObj.bor,
                    oInt: typeof message.oInt !== 'undefined' ? message.oInt :indexObj.oInt,
                    oIntC: typeof message.oIntC !== 'undefined' ? message.oIntC :indexObj.oIntC,
                    div: typeof message.div !== 'undefined' ? message.div :indexObj.div,
                    edd: typeof message.edd !== 'undefined' ? message.edd :indexObj.edd,
                    sp: typeof message.sp !== 'undefined' ? message.sp :indexObj.sp,
                    matD: typeof message.matD !== 'undefined' ? message.matD :indexObj.matD,
                    boT: typeof message.boT !== 'undefined' ? message.boT :indexObj.boT,
                    outA: typeof message.outA !== 'undefined' ? message.outA :indexObj.outA,
                    setD: typeof message.setD !== 'undefined' ? message.setD :indexObj.setD,
                    dcm: typeof message.dcm !== 'undefined' ? message.dcm :indexObj.dcm,
                    isMainIdx: typeof message.isMainIdx !== 'undefined' ? message.isMainIdx :indexObj.isMainIdx,
                    lstShares: typeof message.lstShares !== 'undefined' ? message.lstShares :indexObj.lstShares,
                    lAnn: typeof message.lAnn !== 'undefined' ? message.lAnn :indexObj.lAnn,
                    ann: typeof message.ann !== 'undefined' ? message.ann :indexObj.ann,
                    dcfs: typeof message.dcfs !== 'undefined' ? message.dcfs :indexObj.dcfs,
                    cvwap: typeof message.cvwap !== 'undefined' ? message.cvwap :indexObj.cvwap,
                    intsV: typeof message.intsV !== 'undefined' ? message.intsV :indexObj.intsV,
                    twap: typeof message.twap !== 'undefined' ? message.twap :indexObj.twap,
                    top :typeof message.top !== 'undefined' ? message.top :indexObj.top,
                    tcp :typeof message.tcp !== 'undefined' ? message.tcp :indexObj.tcp,
                    tov :typeof message.tov !== 'undefined' ? message.tov :indexObj.tov,
                    tcv :typeof message.tcv !== 'undefined' ? message.tcv :indexObj.tcv,
                    av5d: typeof message.av5d !== 'undefined' ? message.av5d :indexObj.av5d,
                    isin: typeof message.isin !== 'undefined' ? message.isin :indexObj.isin,
                    tick: typeof message.tick !== 'undefined' ? message.tick :indexObj.tick,
                    shreCap: typeof message.shreCap !== 'undefined' ? message.shreCap :indexObj.shreCap,
                    issueAmnt: typeof message.issueAmnt !== 'undefined' ? message.issueAmnt :indexObj.issueAmnt,
                    dayCountMethod: typeof message.dayCountMethod !== 'undefined' ? message.dayCountMethod :indexObj.dayCountMethod,
                    stlmt: typeof message.stlmt !== 'undefined' ? message.stlmt :indexObj.stlmt,
                    nms: typeof message.nms !== 'undefined' ? message.nms :indexObj.nms,
                    sname: typeof message.sname !== 'undefined' ? message.sname :indexObj.sname,
                    shortsellqtyLimit: typeof message.shortsellqtyLimit !== 'undefined' ? message.shortsellqtyLimit :indexObj.shortsellqtyLimit,
                    shortsellstatus: typeof message.shortsellstatus !== 'undefined' ? message.shortsellstatus :indexObj.shortsellstatus,
                    shortsellenabled: typeof message.shortsellenabled !== 'undefined' ? message.shortsellenabled :indexObj.shortsellenabled,
                    CBmaxprc: typeof message.CBmaxprc !== 'undefined' ? message.CBmaxprc :indexObj.CBmaxprc,
                    CBminprc: typeof message.CBminprc !== 'undefined' ? message.CBminprc :indexObj.CBminprc,
                    ChgPctTOP: typeof message.ChgPctTOP !== 'undefined' ? message.ChgPctTOP :indexObj.ChgPctTOP,
                    endTime : typeof message.endTime !== 'undefined' ? message.endTime :indexObj.endTime,
                    symStatus: typeof message.symStatus !== 'undefined' ? message.symStatus :indexObj.symStatus,
                    TALTime: typeof message.TALTime !== 'undefined' ? message.TALTime :indexObj.TALTime,
                    isShariaSymbol: typeof message.isShariaSymbol !== 'undefined' ? message.isShariaSymbol :indexObj.isShariaSymbol,
                    prjPrc: typeof message.prjPrc !== 'undefined' ? message.prjPrc :indexObj.prjPrc,
                    prjVol: typeof message.prjVol !== 'undefined' ? message.prjVol :indexObj.prjVol,
                    prjPcng : typeof message.prjPcng !== 'undefined' ? message.prjPcng :indexObj.prjPcng,
                    prjVal : typeof message.prjVal !== 'undefined' ? message.prjVal :indexObj.prjVal,
                    qtyTick : typeof message.qtyTick !== 'undefined' ? message.qtyTick :indexObj.qtyTick,
                    noOfPayment: typeof message.noOfPayment !== 'undefined' ? message.noOfPayment :indexObj.noOfPayment,
                    issueDate : typeof message.issueDate !== 'undefined' ? message.issueDate :indexObj.issueDate,
                    interestDayBasis : typeof message.interestDayBasis !== 'undefined' ? message.interestDayBasis :indexObj.interestDayBasis,
                    cd : typeof message.cd !== 'undefined' ? message.cd :indexObj.cd ,
                }
            }
            // reduxStore.store.dispatch(saveStock(data));
    }

    _processIndexResponse (message) {
        let indexObj = sharedService.getService('price').stockDS.getStock(message.exg, message.sym, utils.AssetTypes.Indices);
        let key = utils.keyGenerator.getKey(message.exg, message.sym);

        const data = {
            [key]: {
                sym : typeof message.sym !== 'undefined' ? message.sym :indexObj.sym,
                symStat : typeof message.symStat !== 'undefined' ? message.symStat :indexObj.symStat,
                lDes : typeof message.lDes !== 'undefined' ? message.lDes :indexObj.lDes,
                sDes : typeof message.sDes !== 'undefined' ? message.sDes :indexObj.sDes,
                dSym : typeof message.dSym !== 'undefined' ? message.dSym :indexObj.dSym,
                exg : typeof message.exg !== 'undefined' ? message.exg :indexObj.exg,
                inst:    typeof message.inst !== 'undefined' ? message.inst :indexObj.inst,
                ast :   typeof message.ast !== 'undefined' ? message.ast :indexObj.ast,
                cid :   typeof message.cid !== 'undefined' ? message.cid :indexObj.cid,
                sec :   typeof message.sec !== 'undefined' ? message.sec :indexObj.sec,
                subMkt: typeof message.subMkt !== 'undefined' ? message.subMkt :indexObj.subMkt,
                open:    typeof message.open !== 'undefined' ? message.open :indexObj.open,
                high:    typeof message.high !== 'undefined' ? message.high :indexObj.high,
                low :   typeof message.low !== 'undefined' ? message.low :indexObj.low,
                cls :   typeof message.cls !== 'undefined' ? message.cls :indexObj.cls,
                chg :   typeof message.chg !== 'undefined' ? message.chg :indexObj.chg,
                pctChg:  typeof message.pctChg !== 'undefined' ? message.pctChg :indexObj.pctChg,
                prvCls:  typeof message.prvCls !== 'undefined' ? message.prvCls :indexObj.prvCls,
                tovr:    typeof message.tovr !== 'undefined' ? message.tovr :indexObj.tovr,
                vol :   typeof message.vol !== 'undefined' ? message.vol :indexObj.vol,
                trades: typeof message.trades !== 'undefined' ? message.trades :indexObj.trades,
                cur: typeof message.cur !== 'undefined' ? message.cur :indexObj.cur,
                ltp: typeof message.ltp !== 'undefined' ? message.ltp :indexObj.ltp,
                ltq: typeof message.ltq !== 'undefined' ? message.ltq :indexObj.ltq,
                ltd: typeof message.ltd !== 'undefined' ? message.ltd :indexObj.ltd,
                ltt: typeof message.ltt !== 'undefined' ? message.ltt :indexObj.ltt,
                bap: typeof message.bap !== 'undefined' ? message.bap :indexObj.bap,
                baq: typeof message.baq !== 'undefined' ? message.baq :indexObj.baq,
                bbp: typeof message.bbp !== 'undefined' ? message.bbp :indexObj.bbp,
                bbq: typeof message.bbq !== 'undefined' ? message.bbq :indexObj.bbq,
                tbq: typeof message.tbq !== 'undefined' ? message.tbq :indexObj.tbq,
                taq: typeof message.taq !== 'undefined' ? message.taq :indexObj.taq,
                h52: typeof message.h52 !== 'undefined' ? message.h52 :indexObj.h52,
                l52: typeof message.l52 !== 'undefined' ? message.l52 :indexObj.l52,
                per: typeof message.per !== 'undefined' ? message.per :indexObj.per,
                pbr: typeof message.pbr !== 'undefined' ? message.pbr :indexObj.pbr,
                eps: typeof message.eps !== 'undefined' ? message.eps :indexObj.eps,
                yld: typeof message.yld !== 'undefined' ? message.yld :indexObj.yld,
                lot: typeof message.lot !== 'undefined' ? message.lot :indexObj.lot,
                uSym: typeof message.uSym !== 'undefined' ? message.uSym :indexObj.uSym,
                stkP: typeof message.stkP !== 'undefined' ? message.stkP :indexObj.stkP,
                expDt: typeof message.expDt !== 'undefined' ? message.expDt :indexObj.expDt,
                deci: typeof message.deci !== 'undefined' ? message.deci :indexObj.deci,
                dcf: typeof message.dcf !== 'undefined' ? message.dcf :indexObj.dcf,
                refValue: typeof message.refValue !== 'undefined' ? message.refValue :indexObj.refValue,
                vwap: typeof message.vwap !== 'undefined' ? message.vwap :indexObj.vwap,
                rng :typeof message.rng !== 'undefined' ? message.rng :indexObj.rng,
                pctRng: typeof message.pctRng !== 'undefined' ? message.pctRng :indexObj.pctRng,
                cshMp: typeof message.cshMp !== 'undefined' ? message.cshMp :indexObj.cshMp,
                mktCap: typeof message.mktCap !== 'undefined' ? message.mktCap :indexObj.mktCap,
                mktCapChg: typeof message.mktCapChg !== 'undefined' ? message.mktCapChg :indexObj.mktCapChg,
                pctYtd: typeof message.pctYtd !== 'undefined' ? message.pctYtd :indexObj.pctYtd,
                cit: typeof message.cit !== 'undefined' ? message.cit :indexObj.cit,
                cot: typeof message.cot !== 'undefined' ? message.cot :indexObj.cot,
                civ: typeof message.civ !== 'undefined' ? message.civ :indexObj.civ,
                cov: typeof message.cov !== 'undefined' ? message.cov :indexObj.cov,
                min: typeof message.min !== 'undefined' ? message.min :indexObj.min,
                max: typeof message.max !== 'undefined' ? message.max :indexObj.max,
                sMin: typeof message.sMin !== 'undefined' ? message.sMin :indexObj.sMin,
                sMax: typeof message.sMax !== 'undefined' ? message.sMax :indexObj.sMax,
                cor: typeof message.cor !== 'undefined' ? message.cor :indexObj.cor,
                cof: typeof message.cof !== 'undefined' ? message.cof :indexObj.cof,
                pcd: typeof message.pcd !== 'undefined' ? message.pcd :indexObj.pcd,
                fVal: typeof message.fVal !== 'undefined' ? message.fVal :indexObj.fVal,
                bor: typeof message.bor !== 'undefined' ? message.bor :indexObj.bor,
                oInt: typeof message.oInt !== 'undefined' ? message.oInt :indexObj.oInt,
                oIntC: typeof message.oIntC !== 'undefined' ? message.oIntC :indexObj.oIntC,
                div: typeof message.div !== 'undefined' ? message.div :indexObj.div,
                edd: typeof message.edd !== 'undefined' ? message.edd :indexObj.edd,
                sp: typeof message.sp !== 'undefined' ? message.sp :indexObj.sp,
                matD: typeof message.matD !== 'undefined' ? message.matD :indexObj.matD,
                boT: typeof message.boT !== 'undefined' ? message.boT :indexObj.boT,
                outA: typeof message.outA !== 'undefined' ? message.outA :indexObj.outA,
                setD: typeof message.setD !== 'undefined' ? message.setD :indexObj.setD,
                dcm: typeof message.dcm !== 'undefined' ? message.dcm :indexObj.dcm,
                isMainIdx: typeof message.isMainIdx !== 'undefined' ? message.isMainIdx :indexObj.isMainIdx,
                lstShares: typeof message.lstShares !== 'undefined' ? message.lstShares :indexObj.lstShares,
                lAnn: typeof message.lAnn !== 'undefined' ? message.lAnn :indexObj.lAnn,
                ann: typeof message.ann !== 'undefined' ? message.ann :indexObj.ann,
                dcfs: typeof message.dcfs !== 'undefined' ? message.dcfs :indexObj.dcfs,
                cvwap: typeof message.cvwap !== 'undefined' ? message.cvwap :indexObj.cvwap,
                intsV: typeof message.intsV !== 'undefined' ? message.intsV :indexObj.intsV,
                twap: typeof message.twap !== 'undefined' ? message.twap :indexObj.twap,
                top :typeof message.top !== 'undefined' ? message.top :indexObj.top,
                tcp :typeof message.tcp !== 'undefined' ? message.tcp :indexObj.tcp,
                tov :typeof message.tov !== 'undefined' ? message.tov :indexObj.tov,
                tcv :typeof message.tcv !== 'undefined' ? message.tcv :indexObj.tcv,
                av5d: typeof message.av5d !== 'undefined' ? message.av5d :indexObj.av5d,
                isin: typeof message.isin !== 'undefined' ? message.isin :indexObj.isin,
                tick: typeof message.tick !== 'undefined' ? message.tick :indexObj.tick,
                shreCap: typeof message.shreCap !== 'undefined' ? message.shreCap :indexObj.shreCap,
                issueAmnt: typeof message.issueAmnt !== 'undefined' ? message.issueAmnt :indexObj.issueAmnt,
                dayCountMethod: typeof message.dayCountMethod !== 'undefined' ? message.dayCountMethod :indexObj.dayCountMethod,
                stlmt: typeof message.stlmt !== 'undefined' ? message.stlmt :indexObj.stlmt,
                nms: typeof message.nms !== 'undefined' ? message.nms :indexObj.nms,
                sname: typeof message.sname !== 'undefined' ? message.sname :indexObj.sname,
                shortsellqtyLimit: typeof message.shortsellqtyLimit !== 'undefined' ? message.shortsellqtyLimit :indexObj.shortsellqtyLimit,
                shortsellstatus: typeof message.shortsellstatus !== 'undefined' ? message.shortsellstatus :indexObj.shortsellstatus,
                shortsellenabled: typeof message.shortsellenabled !== 'undefined' ? message.shortsellenabled :indexObj.shortsellenabled,
                CBmaxprc: typeof message.CBmaxprc !== 'undefined' ? message.CBmaxprc :indexObj.CBmaxprc,
                CBminprc: typeof message.CBminprc !== 'undefined' ? message.CBminprc :indexObj.CBminprc,
                ChgPctTOP: typeof message.ChgPctTOP !== 'undefined' ? message.ChgPctTOP :indexObj.ChgPctTOP,
                endTime : typeof message.endTime !== 'undefined' ? message.endTime :indexObj.endTime,
                symStatus: typeof message.symStatus !== 'undefined' ? message.symStatus :indexObj.symStatus,
                TALTime: typeof message.TALTime !== 'undefined' ? message.TALTime :indexObj.TALTime,
                isShariaSymbol: typeof message.isShariaSymbol !== 'undefined' ? message.isShariaSymbol :indexObj.isShariaSymbol,
                prjPrc: typeof message.prjPrc !== 'undefined' ? message.prjPrc :indexObj.prjPrc,
                prjVol: typeof message.prjVol !== 'undefined' ? message.prjVol :indexObj.prjVol,
                prjPcng : typeof message.prjPcng !== 'undefined' ? message.prjPcng :indexObj.prjPcng,
                prjVal : typeof message.prjVal !== 'undefined' ? message.prjVal :indexObj.prjVal,
                qtyTick : typeof message.qtyTick !== 'undefined' ? message.qtyTick :indexObj.qtyTick,
                noOfPayment: typeof message.noOfPayment !== 'undefined' ? message.noOfPayment :indexObj.noOfPayment,
                issueDate : typeof message.issueDate !== 'undefined' ? message.issueDate :indexObj.issueDate,
                interestDayBasis : typeof message.interestDayBasis !== 'undefined' ? message.interestDayBasis :indexObj.interestDayBasis,
                cd : typeof message.cd !== 'undefined' ? message.cd :indexObj.cd ,
            }
        }
        // reduxStore.store.dispatch(saveStock(data));


        // let existingStockObj = reduxStore.store.getState().stock.stocks.stockData;
        // let existingStockObjByIndices = reduxStore.store.getState().stock.stockDataByIndices;

        if (message.inst === 7) {
            // existingStockObjByIndices[indicesKey] = indexObj;
        }

    }

    _processExchangeResponse (message) {
        let exchangeObj = sharedService.getService('price').exchangeDS.getExchange(message.exg);
        let key = utils.keyGenerator.getKey(message.exg, message.sym);

        let tempExg = {};
        if (exchangeObj !== null) {

            exchangeObj.exg = typeof message.exg !== 'undefined' ? message.exg : exchangeObj.exg;
            exchangeObj.des = typeof message.des !== 'undefined' ? message.des : exchangeObj.des;
            exchangeObj.sDes = typeof message.sDes !== 'undefined' ? message.sDes : exchangeObj.sDes;
            exchangeObj.dcf = typeof message.dcf !== 'undefined' ? message.dcf : exchangeObj.dcf;
            exchangeObj.dep = typeof message.dep !== 'undefined' ? message.dep : exchangeObj.dep;
            exchangeObj.de = typeof message.de !== 'undefined' ? message.de : exchangeObj.de;
            exchangeObj.stat = typeof message.stat !== 'undefined' ? message.stat : exchangeObj.stat;
            exchangeObj.cur = typeof message.cur !== 'undefined' ? message.cur : exchangeObj.cur;
            exchangeObj.delTime = typeof message.delTime !== 'undefined' ? message.delTime : exchangeObj.delTime;
            exchangeObj.country = typeof message.country !== 'undefined' ? message.country : exchangeObj.country;
            exchangeObj.tzo = typeof message.tzo !== 'undefined' ? message.tzo : exchangeObj.tzo;
            exchangeObj.date = typeof message.date !== 'undefined' ? message.date : exchangeObj.date;
            exchangeObj.time = typeof message.time !== 'undefined' ? message.time : exchangeObj.time;
            exchangeObj.led = typeof message.led !== 'undefined' ? message.led : exchangeObj.led;
            exchangeObj.ups = typeof message.ups !== 'undefined' ? message.ups : exchangeObj.ups;
            exchangeObj.dwns = typeof message.dwns !== 'undefined' ? message.dwns : exchangeObj.dwns;
            exchangeObj.nChg = typeof message.nChg !== 'undefined' ? message.nChg : exchangeObj.nChg;
            exchangeObj.symt = typeof message.symt !== 'undefined' ? message.symt : exchangeObj.symt;
            exchangeObj.vol = typeof message.vol !== 'undefined' ? message.vol : exchangeObj.vol;
            exchangeObj.tovr = typeof message.tovr !== 'undefined' ? message.tovr : exchangeObj.tovr;
            exchangeObj.trades = typeof message.trades !== 'undefined' ? message.trades : exchangeObj.trades;
            exchangeObj.mktCap = typeof message.mktCap !== 'undefined' ? message.mktCap : exchangeObj.mktCap;
            exchangeObj.mboal = typeof message.mboal !== 'undefined' ? message.mboal : exchangeObj.mboal;
            exchangeObj.mbol = typeof message.mbol !== 'undefined' ? message.mbol : exchangeObj.mbol;
            exchangeObj.mbpal = typeof message.mbpal !== 'undefined' ? message.mbpal : exchangeObj.mbpal;
            exchangeObj.mbpl = typeof message.mbpl !== 'undefined' ? message.mbpl : exchangeObj.mbpl;
            exchangeObj.mboae = typeof message.mboae !== 'undefined' ? message.mboae : exchangeObj.mboae;
            exchangeObj.mbpae = typeof message.mbpae !== 'undefined' ? message.mbpae : exchangeObj.mbpae;
            exchangeObj.virtual = typeof message.virtual !== 'undefined' ? message.virtual : exchangeObj.virtual;
            exchangeObj.cio = typeof message.cio !== 'undefined' ? message.cio : exchangeObj.cio;
            exchangeObj.civ = typeof message.civ !== 'undefined' ? message.civ : exchangeObj.civ;
            exchangeObj.cit = typeof message.cit !== 'undefined' ? message.cit : exchangeObj.cit;
            exchangeObj.coo = typeof message.coo !== 'undefined' ? message.coo : exchangeObj.coo;
            exchangeObj.cov = typeof message.cov !== 'undefined' ? message.cov : exchangeObj.cov;
            exchangeObj.cot = typeof message.cot !== 'undefined' ? message.cot : exchangeObj.cot;
            exchangeObj.netCashPer = typeof message.exg !== 'undefined' ? message.exg : exchangeObj.exg;
            exchangeObj.cashInPer = typeof message.cashInPer !== 'undefined' ? message.cashInPer : exchangeObj.cashInPer;
            exchangeObj.mainIdx = typeof message.mainIdx !== 'undefined' ? message.mainIdx : exchangeObj.mainIdx;
            exchangeObj.newsProv = typeof message.newsProv !== 'undefined' ? message.newsProv : exchangeObj.newsProv;
            exchangeObj.openTime = typeof message.openTime !== 'undefined' ? message.openTime : exchangeObj.openTime;
            exchangeObj.closeTime = typeof message.closeTime !== 'undefined' ? message.closeTime : exchangeObj.closeTime;
            exchangeObj.statStr = typeof message.statStr !== 'undefined' ? message.statStr : exchangeObj.statStr;
            exchangeObj.subMarketArray = typeof message.subMarketArray !== 'undefined' ? message.subMarketArray : exchangeObj.subMarketArray;
            exchangeObj.tick = typeof message.tick !== 'undefined' ? message.tick : exchangeObj.tick;
            exchangeObj.statStrLong = typeof message.statStrLong !== 'undefined' ? message.statStrLong : exchangeObj.statStrLong;
            exchangeObj.brokerMapping = typeof message.brokerMapping !== 'undefined' ? message.brokerMapping : exchangeObj.brokerMapping;
            exchangeObj.exgOtherDesc = typeof message.exgOtherDesc !== 'undefined' ? message.exgOtherDesc : exchangeObj.exgOtherDesc;
            exchangeObj.mktDateTime = typeof message.mktDateTime !== 'undefined' ? message.mktDateTime : exchangeObj.mktDateTime;
            exchangeObj.tzId = typeof message.tzId !== 'undefined' ? message.tzId : exchangeObj.tzId;

        }

        let stockObj = sharedService.getService('price').stockDS.getStock(message.exg, message.sym, utils.AssetTypes.Indices);
        stockObj.symbolObj = exchangeObj;

        // let existingStockObj = reduxStore.store.getState().stock.stocks.stockData;
        // existingStockObj[key] = stockObj;


        // reduxStore.store.dispatch(saveStock(existingStockObj));

        // let existingExchange = reduxStore.store.getState().exchangeStore.exchangeData;

        // existingExchange[message.exg] = exchangeObj;
        // tempExg[message.exg] = exchangeObj;
        // reduxStore.store.dispatch(saveExchange(existingExchange));
        // reduxStore.store.dispatch(saveCurrentExchange(tempExg));


    }

    _processSubMarketResponse (message) {
        if (sharedService.getService('price').exchangeDS.isSubMarketAvailable(message.exg)) {
            let subMarketObj = sharedService.getService('price').subMarketDS.getSubMarket(message.exg, message.sym);

            if (subMarketObj !== null) {
                subMarketObj.setData(message);
            }
        }
    }

    _processMarketDepth (message, type) {
        let depthByPriceObj = sharedService.getService('price').marketDepthDS.getDepthItem(message.exg, message.sym, type);

        if (depthByPriceObj !== null) {
            depthByPriceObj.setData(message.D, type);
        }
    }

    _processOHLCResponse (message) {
        // let ohlcSeries = sharedService.getService('price').ohlcDS.getOHLCSeries(message.exg, message.sym, ChartConstants.ChartCategory.Intraday);

        // Load exchange object for obtaining the timezone
        let exgObj = sharedService.getService('price').exchangeDS.getExchange(message.exg);

        let pt = utils.formatters.convertToUTCTimestamp(parseInt(message.dt, 10) * PriceConstants.UnixTimestampByMinutes * PriceConstants.UnixTimestampByMilliSeconds);
        let date = utils.formatters.convertToUTCDate(pt, exgObj.tzo);

        // ohlcSeries.setData({
        //     dt: date,
        //     open: message.open,
        //     high: message.high,
        //     low: message.low,
        //     close: message.cls,
        //     volume: message.vol,
        //     turnover: message.tOvr
        // }, true);
    }

    _processTOPVOHLCResponse (message) {
        // let ohlcSeries = sharedService.getService('price').theoreticalChartDS.getOHLCSeries(message.exg, message.sym, ChartConstants.ChartCategory.Intraday);

        // Load exchange object for obtaining the timezone
        let exgObj = sharedService.getService('price').exchangeDS.getExchange(message.exg);

        let pt = utils.formatters.convertToUTCTimestamp(parseInt(message.dt, 10) * PriceConstants.UnixTimestampByMinutes * PriceConstants.UnixTimestampByMilliSeconds);
        let date = utils.formatters.convertToUTCDate(pt, exgObj.tzo);

        // ohlcSeries.setData({
        //     dt: date,
        //     open: message.open,
        //     high: message.high,
        //     low: message.low,
        //     close: message.cls,
        //     volume: message.vol,
        //     turnover: message.tOvr
        // }, true);
    }

    _processTimeAndSalesResponse (message) {
        let timeAndSalesInstance = sharedService.getService('price').timeAndSalesDS;
        let exchange = message.exg;
        let symbol = message.sym;
        let seq = message.seq;
        let tradeObj = timeAndSalesInstance.getNewTrade(exchange, symbol, seq);
        let prevTradeObj = timeAndSalesInstance.getLastTrade(exchange, symbol);

        if (tradeObj) {
            if (prevTradeObj) {
                message.trp = message.trp || prevTradeObj.trp;
                message.trq = message.trq || prevTradeObj.trq;
                message.splits = message.splits || prevTradeObj.splits;
                message.trdType = message.trdType || prevTradeObj.trdType;
                message.tts = message.tts || prevTradeObj.tts;
                message.nChg = message.nChg || prevTradeObj.nChg;
                message.pctChg = message.pctChg || prevTradeObj.pctChg;
                message.buyCode = message.buyCode || prevTradeObj.buyCode;
                message.selCode = message.selCode || prevTradeObj.selCode;
            }

            tradeObj.setData(message);

            if (prevTradeObj) {
                tradeObj.setTradeTick(prevTradeObj.trp);
            }

            timeAndSalesInstance.setLastTrade(exchange, symbol, tradeObj);
        }
    }

    _processNewsAnnouncementResponse (message, type) {
        let annObj = sharedService.getService('price').announcementDS.createAnnouncement(message.id, type, message.sym, message.exg);
        let subType = '';

        if (annObj !== null) {
            if (type === PriceConstants.ResponseType.Data.ResponseAnnouncement) {
                if (message.ref) {
                    let itemTagArray = (message.ref.split(utils.Constants.StringConst.Pipe));
                    subType = parseInt(itemTagArray[itemTagArray.length - 1], 10);
                }
            } else {
                subType = message.type;
            }

            message.subType = subType;

            annObj.setData(message);
            annObj.set('type', type);

            sharedService.getService('price').announcementDS.addToOtherCollections(annObj, type);
        }

        if (type === PriceConstants.ResponseType.Data.ResponseAnnouncement) {
            sharedService.getService('price').stockDS.setAnnouncement(annObj);
        }
    }

    _processTopStockResponse (message) {
        sharedService.getService('price').topStockDS.createTopStocks(message.exg, message.tt, message.D, message.mkt);
    }

    _processAuthResponse (message, authCallbacks, onSocketReady) {
        let priceAuthResponse = utils.jsonHelper.convertToJson(message);

        window.appGlobal.logger = {priceAuthResponse: priceAuthResponse};
        utils.logger.logInfo('Price auth response : ' + priceAuthResponse);

        let authSuccess = false;
        let priceService = sharedService.getService('price');
        let isLoggedIn = priceService.isAuthenticated();

        // window.appGlobal.logger = {preAuthPriceUser: utils.jsonHelper.convertToJson(priceService.userDS)};

        if (message.AUTHSTAT > 0) {
            utils.logger.logInfo('Price user authenticated successfully.');

            // reduxStore.store.dispatch(setLoginStatus());
            authSuccess = true;

            // let savedPriceUserData = priceService.userDS;

            // // // window.appGlobal.priceUser = {delayedExchanges: savedPriceUserData ? savedPriceUserData.delayedExchg : []};
            // // // window.appGlobal.priceUser = {prevDayExchanges: savedPriceUserData ? savedPriceUserData.prevDayExchg : []};

            let messageObj = this._setUserExchanges(message);
            messageObj = this._setWindowTypes(messageObj);

            let userData = {
                // cacheKey: 'priceUser',
                isEncrypt: true,
                oneDayInMillis: 86400000, // 1000 * 60 * 60 * 24

                // Auth related params
                sessionId: messageObj.SID,
                authStatus: messageObj.AUTHSTAT,
                userId: messageObj.UID,
                username: messageObj.UNM,
                userExchg: messageObj.UE, // Only default exchanges
                newsProviders: messageObj.NWSP,
                expiryDate: messageObj.EXPDATE,
                windowTypes: messageObj.WT,
                name: messageObj.NAME,
                expiredExchg: messageObj.EXPEXG,
                inactiveExchg: messageObj.INACEXG,
                metaVersion: messageObj.METAVER,
                delayedExchg: messageObj.DE, // Only delayed exchanges
                prevDayExchg: messageObj.PDE, // Only previous market day exchanges
                billingCode: messageObj.BILLINGCODE,
                nonDefExg: messageObj.NDE, // Only non-default exchanges
                isMultipleUserExchangesAvailable: false,
            }
            //  let userObj = new PriceUser(userData);

            // reduxStore.store.dispatch(saveUser(userObj));
            // priceService.userDS.setData(messageObj, true);
            // priceService.userDS.save();


            // window.appGlobal.logger = {postAuthPriceUser: utils.jsonHelper.convertToJson(reduxStore.store.getState().user.userData)};
        } else {
            if (message.AUTHSTAT === PriceConstants.AuthStatus.ForceChangePassword) {
                message.SID = '';
                priceService.userDS.setData(message, true);

                sharedService.getService('sharedUI').loginViewController.showHomePage();
                sharedService.getService('priceUI').invokeChangePassword();

                return;
            } else {
                utils.logger.logInfo('Pirce user authentication failed.' + message.AUTHMSG);
            }
        }


        if (onSocketReady instanceof Function) {
            onSocketReady(authSuccess);
        }

        if (authSuccess) {
            if (authCallbacks.successFn instanceof Function) {
                authCallbacks.successFn();
            }

            if (authCallbacks.postSuccessFn instanceof Function) {
                authCallbacks.postSuccessFn();
            }
        } else {
            let authMsg = message.AUTHMSG;

            if (isLoggedIn) {
                // Logout from the application with error message set in login page
                utils.webStorage.addString(utils.webStorage.getKey(utils.Constants.CacheKeys.LoginErrorMsg), authMsg, utils.Constants.StorageType.Session);
                // utils.applicationSessionHandler.logout(authMsg);
            } else if (authCallbacks.errorFn instanceof Function) {
                // Simply set error message in login page
                authCallbacks.errorFn(authMsg);
            }
        }
    }

    _setUserExchanges (message) {
        // Sample: TDWL,0,1|ADSM,0,1|DFM,1,1|NSDQ,0,0
        let authType = PriceConstants.ResponseType.Authentication;
        let configExchanges = (AppConfig.responseConfig && AppConfig.responseConfig[authType]) ? AppConfig.responseConfig[authType].UE : '';
        let userExchange = utils.validators.isAvailable(configExchanges) ? configExchanges : message.UE;


        let userExchanges = [];
        let userDelayedExchanges = [];
        let userPrevDayExchanges = [];
        let nonDefaultExchanges = [];

        if (userExchange) {
            let tempArray;
            let userExgArray = userExchange.split(utils.Constants.StringConst.Pipe);

            Object.keys(userExgArray).forEach(function(key) {
                tempArray = userExgArray[key].split(utils.Constants.StringConst.Comma);

                // Checking non-existence indices in an array is safe as they return undefined
                let exchange = tempArray[0];
                let subTypeFlag = tempArray[1];
                let defaultFlag = tempArray[2];

                if (utils.validators.isAvailable(exchange)) {
                    // Exchange is delayed only if marked as an delayed exchange
                    // If flag is not set, consider exchange as real time
                    if (subTypeFlag === PriceConstants.ExchangeSubscriptionType.Delayed) {
                        userDelayedExchanges[userDelayedExchanges.length] = exchange;
                    } else if (subTypeFlag === PriceConstants.ExchangeSubscriptionType.PrevDay) {
                        userPrevDayExchanges[userPrevDayExchanges.length] = exchange;
                    }

                    // Exchange is non-default only if marked as non-default exchange
                    // If flag is not set, consider as a default exchange
                    if (defaultFlag === utils.Constants.No) {
                        nonDefaultExchanges[nonDefaultExchanges.length] = exchange;
                    } else {
                        // Only default exchanges are available in user exchange array
                        // Non default exchanges are kept in a separate property
                        userExchanges[userExchanges.length] = exchange;
                    }
                }
            });
        }


        message.UE = userExchanges;
        message.DE = userDelayedExchanges;
        message.PDE = userPrevDayExchanges;
        message.NDE = nonDefaultExchanges;

        return message;
    }

    _setWindowTypes (message) {
        let windowTypes = message.WT;
        let userTypesMap = {};

        if (windowTypes) {
            let typesByExg = windowTypes.split('|');

            if (typesByExg.length > 0) {
                Object.keys(typesByExg).forEach(function(key) {
                    if ( typesByExg[key]) {
                        let typeArray =  typesByExg[key].split(',');

                        if (typeArray.length > 1) {
                            let exg = typeArray.splice(0, 1);
                            userTypesMap[exg[0]] = typeArray;
                        }
                    }
                });

                message.WT = this._processCustomWindowTypes(userTypesMap);
            }
        }

        return message;
    }

    _processCustomWindowTypes (userTypesMap) {

        Object.keys(userTypesMap).forEach(function(key) {
            let customTypesByExg = sharedService.getService('price').settings.configs.customWindowTypes[key];

            if (customTypesByExg) {
                userTypesMap[key].removeItems(customTypesByExg.exclude);
                userTypesMap[key] = userTypesMap[key].union(customTypesByExg.include);
            }
        });

        return userTypesMap;
    }

    _processFullMarketEndResponse (message) {
        sharedService.getService('price').onFullMarketSnapshotReceived(message.exg);
    }

    _processChangePassword (message) {
        let callbackFn = sharedService.getService('price').changePasswordCallback;
        let rejectedReason = message.chgPwdMsg ? message.chgPwdMsg : 'passwordChangeFail';
        // let currentLangObj = languageDataStore.getLanguageObj().lang;

        // if (currentLangObj) {
        //     rejectedReason = currentLangObj.messages[rejectedReason];
        // }

        // if (callbackFn && callbackFn instanceof Function) {
        //     callbackFn(message.AUTHSTAT, rejectedReason);
        // }
    }

    _processAlertResponse (message) {
        if (message.rcpttype !== 'unsubscribe') {
            let alertObj = sharedService.getService('price').alertDS.getAlert(message.TOK, message.exg);

            if (alertObj !== null) {
                alertObj.setData({
                    status: message.stat,
                    exp: message.EXP,
                    fr: message.FR,
                    cr: message.cr,
                    flt: message.FLT,
                    sym: message.sym
                });
            }
        } else {
            this._processAlertUnSubscribeResponse(message);
        }

        sharedService.getService('price').alertDS.alertUpdateRecieved();
    }

    _processAlertTriggerResponse (message) {
        let alertObj = sharedService.getService('price').alertDS.getAlert(message.TOK, message.exg, message.sym);

        if (alertObj !== null) {
            alertObj.setData({
                status: message.stat,
                fr: message.FR,
                cr: message.cr,
                ltr: message.ltr,
                trv: message.trv,
                flt: message.FLT
            });
        }

        sharedService.getService('price').notifyAlertTrigger(alertObj);
        sharedService.getService('price').alertDS.alertUpdateRecieved();
    }

    _processAlertUnSubscribeResponse (message) {
        sharedService.getService('price').alertDS.removeAlertFromCollections(message.TOK);
    }

    _processProjectedPriceResponse (message) {
        // BUG | AAASUP-354 | Projected Price:: Volume not shown when there is no change in volume and only price field is changed
        let stockObj = sharedService.getService('price').stockDS.getStock(message.exg, message.sym, message.inst, undefined, message.symStat);

        if (stockObj !== null) {
            stockObj.setData(message);
        }
    }
}