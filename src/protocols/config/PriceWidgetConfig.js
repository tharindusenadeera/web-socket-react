// eslint-disable-next-line import/no-anonymous-default-export
export default {
    singleRowHeight: 25,
    minHeaderHeight: 25,

    watchList: {

        // TODO: [satheeqh] Alter column id paths in table-controller instead hard coding dataObj here
        defaultColumnMapping: {
            menu: {id: 'menu', width: 25, name: 'menu', headerName: '', headerStyle: 'text-center', iconClass: 'icon-angle-right', isColumnSortDisabled: true, type: 'buttonMenu', buttonFunction: 'popUpWidgetButtonMenu'},
            sym: {id: 'dataObj.dSym', width: 125, headerName: 'symbol', secondId: 'dataObj.sDes', headerStyle: 'text-left-header', sortKeyword: 'sDes', type: 'dualText', isndicatorAvailable: true},
            exg: {id: 'dataObj.dExg', width: 65, headerName: 'exchange', sortKeyword: 'exg', firstValueStyle: 'fade-fore-color'},
            trend: {id: 'dataObj.trend', width: 25, name: 'trend', headerName: '', thirdId: 'dataObj.trend', sortKeyword: 'chg', type: 'upDown'},
            ltp: {id: 'dataObj.ltp', width: 90, headerName: 'last', headerSecondName: 'lastQty', secondId: 'dataObj.ltq', sortKeyword: 'ltp', dataType: 'float', type: 'dualArrow', firstValueStyle: 'highlight-fore-color bold', backgroundStyle: 'watchlist-cell-back-lastqty', isBlink: true, noOfSecValueDecimalPlaces: 0, noOfDecimalPlaces: 'dataObj.deci'},
            chg: {id: 'dataObj.chg', width: 70, headerName: 'change', headerSecondName: 'perChange', secondId: 'dataObj.pctChg', sortKeyword: 'chg', positiveNegativeChange: true, type: 'dualChange', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 2},
            bbp: {id: 'dataObj.bbp', width: 70, headerName: 'bid', headerSecondName: 'bidQty', secondId: 'dataObj.bbq', type: 'dual', sortKeyword: 'bbp', firstValueStyle: 'up-fore-color', secondValueStyle: 'up-fore-color', backgroundStyle: 'watchlist-cell-back-green', isBlink: true, dataType: 'float', noOfSecValueDecimalPlaces: 0, noOfDecimalPlaces: 'dataObj.deci'},
            bap: {id: 'dataObj.bap', width: 70, headerName: 'offer', headerSecondName: 'offerQty', secondId: 'dataObj.baq', type: 'dual', firstValueStyle: 'down-fore-color', secondValueStyle: 'down-fore-color', backgroundStyle: 'watchlist-cell-back-red', sortKeyword: 'bap', isBlink: true, dataType: 'float', noOfSecValueDecimalPlaces: 0, noOfDecimalPlaces: 'dataObj.deci'},
            l52: {id: 'dataObj.l52', width: 100, headerName: 'fiftyTwoWkHL', secondId: 'dataObj.h52', thirdId: 'dataObj.ltp', type: 'dot', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            vol: {id: 'dataObj.vol', width: 85, headerName: 'volume', sortKeyword: 'vol', dataType: 'int', firstValueStyle: 'fore-color', isBlink: true, blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            tovr: {id: 'dataObj.tovr', width: 90, headerName: 'turnover', sortKeyword: 'tovr', dataType: 'int', firstValueStyle: 'fore-color', isBlink: true, blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            trades: {id: 'dataObj.trades', width: 70, headerName: 'trades', sortKeyword: 'trades', dataType: 'int', firstValueStyle: 'fore-color', isBlink: true, blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            prvCls: {id: 'dataObj.prvCls', width: 90, headerName: 'preClosed', headerSecondName: 'open', secondId: 'dataObj.open', type: 'dual', sortKeyword: 'prvCls', firstValueStyle: 'fore-color', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            cit: {id: 'dataObj.cit', width: 85, headerName: 'cashMap', secondId: 'dataObj.cot', type: 'progress'},
            dltt: {id: 'dataObj.dltt', width: 115, headerName: 'lastTradedTime', headerSecondName: 'lastTradedDate', secondId: 'dataObj.ltd', type: 'dual', sortKeyword: 'dltt', firstValueStyle: 'fore-color', dataType: 'time'},
            high: {id: 'dataObj.high', width: 70, headerName: 'high', headerSecondName: 'low', secondId: 'dataObj.low', type: 'dual', sortKeyword: 'high', firstValueStyle: 'fore-color', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            cvwap: {id: 'dataObj.cvwap', width: 70, headerName: 'cvwap', headerSecondName: 'twap', secondId: 'dataObj.twap', type: 'dual', sortKeyword: 'cvwap', firstValueStyle: 'fore-color', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            max: {id: 'dataObj.max', width: 70, headerName: 'max', headerSecondName: 'min', secondId: 'dataObj.min', type: 'dual', sortKeyword: 'max', firstValueStyle: 'fore-color', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            top: {id: 'dataObj.top', width: 90, headerName: 'top', headerSecondName: 'tov', secondId: 'dataObj.tov', type: 'dual', sortKeyword: 'top', firstValueStyle: 'fore-color', dataType: 'float', noOfSecValueDecimalPlaces: 0, noOfDecimalPlaces: 'dataObj.deci'},
            tcp: {id: 'dataObj.tcp', width: 90, headerName: 'tcp', headerSecondName: 'tcv', secondId: 'dataObj.tcv', type: 'dual', sortKeyword: 'tov', firstValueStyle: 'fore-color', dataType: 'float', noOfSecValueDecimalPlaces: 0, noOfDecimalPlaces: 'dataObj.deci'},
            isin: {id: 'dataObj.isin', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'isin', type: 'classicCell', sortKeyword: 'isin', firstValueStyle: 'fore-color bold'},
            instDes: {id: 'dataObj.instDes', width: 90, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'inst', type: 'classicCell', sortKeyword: 'inst', firstValueStyle: 'fore-color bold'},
            cls: {id: 'dataObj.cls', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'close', type: 'classicCell', sortKeyword: 'cls', firstValueStyle: 'fore-color bold'},
            refValue: {id: 'dataObj.refValue', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'refValue', type: 'classicCell', sortKeyword: 'tov', firstValueStyle: 'fore-color bold', dataType: 'float'},
            tbq: {id: 'dataObj.tbq', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'tbq', type: 'classicCell', sortKeyword: 'tbq', firstValueStyle: 'fore-color bold', dataType: 'int'},
            taq: {id: 'dataObj.taq', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'taq', type: 'classicCell', sortKeyword: 'taq', firstValueStyle: 'fore-color bold', dataType: 'int'},
            eps: {id: 'dataObj.eps', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'eps', type: 'classicCell', sortKeyword: 'eps', firstValueStyle: 'fore-color bold'},
            mktCap: {id: 'dataObj.mktCap', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'mktCap', type: 'classicCell', sortKeyword: 'mktCap', firstValueStyle: 'fore-color bold', dataType: 'int'},
            per: {id: 'dataObj.per', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'per', type: 'classicCell', sortKeyword: 'per', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            lstShares: {id: 'dataObj.lstShares', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'listedShr', type: 'classicCell', sortKeyword: 'lstShares', firstValueStyle: 'fore-color bold', dataType: 'int'},
            shreCap: {id: 'dataObj.shreCap', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shareCapital', type: 'classicCell', sortKeyword: 'shreCap', firstValueStyle: 'fore-color bold', dataType: 'int'},
            twap: {id: 'dataObj.twap', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'twap', headerTitleName: 'twapDesc', type: 'classicCell', sortKeyword: 'twap', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            vwap: {id: 'dataObj.vwap', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'vWAP', headerTitleName: 'twapDesc', type: 'classicCell', sortKeyword: 'vWAP', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            sname: {id: 'dataObj.sname', width: 100, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'session', headerStyle: 'text-left-header', type: 'classicCell', sortKeyword: 'dataObj.sname', firstValueStyle: 'highlight-fore-color bold', cellStyle: 'text-left-header'},
            nms: {id: 'dataObj.nms', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'nms', headerTitleName: 'nms', type: 'classicCell', sortKeyword: 'dataObj.nms', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            shortSellEnabled: {id: 'dataObj.shrtSelEnabld', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shortSellEnabled', headerTitleName: 'shortSellEnabled', sortKeyword: 'dataObj.shrtSelEnabld', type: 'classicTextCell', firstValueStyle: 'fore-color bold', dataType: 'string'},
            shortSellStatus: {id: 'dataObj.shrtSelStats', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shortSellStatus', headerTitleName: 'shortSellStatus', sortKeyword: 'dataObj.shrtSelStats', type: 'classicTextCell', firstValueStyle: 'fore-color bold', dataType: 'string'},
            shortSellQtyLimit: {id: 'dataObj.shortsellqtyLimit', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shortSellQtyLimit', headerTitleName: 'shortSellQtyLimit', sortKeyword: 'dataObj.shortsellqtyLimit', type: 'classicTextCell', firstValueStyle: 'fore-color bold', dataType: 'int'},
            CBmaxprc: {id: 'dataObj.CBmaxprc', width: 120, headerName: 'circuitBreakerHigh', headerSecondName: 'circuitBreakerLow', secondId: 'dataObj.CBminprc', type: 'dual', sortKeyword: 'CBmaxprc', firstValueStyle: 'fore-color', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            ChgPctTOP: {id: 'dataObj.ChgPctTOP', width: 85, headerName: 'topPerChange', sortKeyword: 'ChgPctTOP', dataType: 'float', firstValueStyle: 'fore-color', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            dispEndTime: {id: 'dataObj.dispEndTime', width: 100, headerName: 'newEndTime', sortKeyword: 'dispEndTime', dataType: 'time', firstValueStyle: 'fore-color', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            dispTALTime: {id: 'dataObj.dispTALTime', width: 85, headerName: 'TALTime', sortKeyword: 'dispTALTime', dataType: 'time', firstValueStyle: 'fore-color', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            symStatusStr: {id: 'dataObj.symStatusStr', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'status', sortKeyword: 'dataObj.shrtSelStats', type: 'classicTextCell', firstValueStyle: 'fore-color', dataType: 'string'},
            cid: {id: 'dataObj.cid', width: 90, headerName: 'symbolCode', headerStyle: 'text-left-header', cellStyle: 'text-left-header', sortKeyword: 'cid', firstValueStyle: 'fore-color', isBlink: true, blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'}
        },

        classicColumnMapping: {
            menu: {id: 'menu', width: 25, headerCellView: 'Ember.ClassicHeaderCell', name: 'Menu', title: 'menuItem', headerName: '', headerStyle: 'text-center', iconClass: 'icon-angle-right', isColumnSortDisabled: true, type: 'buttonMenu', buttonFunction: 'popUpWidgetButtonMenu', buttonMenu: 'mainContextMenu'},
            sym: {id: 'dataObj.dSym', width: 95, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', firstValueStyle: 'font-l', sortKeyword: 'sym', cellStyle: 'fore-color text-left-header', type: 'textIconCell', isndicatorAvailable: true},  // width:94px for worst case scenario
            exg: {id: 'dataObj.dExg', width: 70, headerName: 'exchange', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-center', sortKeyword: 'exg', cellStyle: 'fore-color text-center', type: 'classicCell', firstValueStyle: 'bold'},
            lDes: {id: 'dataObj.lDes', width: 105, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'description', headerStyle: 'text-left-header', sortKeyword: 'lDes', cellStyle: 'text-left-header', type: 'classicTextCell', firstValueStyle: 'bold fore-color font-l'},
            sDes: {id: 'dataObj.sDes', width: 105, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'sDescription', headerStyle: 'text-left-header', sortKeyword: 'sDes', cellStyle: 'text-left-header', type: 'classicTextCell', firstValueStyle: 'bold fore-color font-l'},
            trend: {id: 'dataObj.trend', width: 25, headerCellView: 'Ember.ClassicHeaderCell', name: 'trend', headerName: '', thirdId: 'dataObj.trend', sortKeyword: 'chg', dataType: 'float', type: 'upDown'},
            ltp: {id: 'dataObj.ltp', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'last', sortKeyword: 'ltp', dataType: 'float', firstValueStyle: 'highlight-fore-color bold font-l', backgroundStyle: 'watchlist-cell-back-lastqty', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, type: 'classicCell', noOfDecimalPlaces: 'dataObj.deci'},
            ltq: {id: 'dataObj.ltq', width: 65, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'lastQty', sortKeyword: 'ltq', dataType: 'int', firstValueStyle: 'highlight-fore-color bold font-l', type: 'classicCell'},
            chg: {id: 'dataObj.chg', width: 50, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'change', sortKeyword: 'chg', positiveNegativeChange: true, type: 'changeCell', positiveStyle: 'up-fore-color font-l', negativeStyle: 'down-fore-color font-l', zeroStyle: 'fade-fore-color font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            pctChg: {id: 'dataObj.pctChg', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'perChange', sortKeyword: 'pctChg', positiveNegativeChange: true, positiveStyle: 'up-fore-color font-l', negativeStyle: 'down-fore-color font-l', zeroStyle: 'fade-fore-color font-l', type: 'changeCell', dataType: 'float', noOfDecimalPlaces: 2},
            bbp: {id: 'dataObj.bbp', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'bid', type: 'classicCell', sortKeyword: 'bbp', firstValueStyle: 'up-fore-color bold font-l', backgroundStyle: 'watchlist-cell-back-green', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            bbq: {id: 'dataObj.bbq', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'bidQty', type: 'classicCell', sortKeyword: 'bbq', firstValueStyle: 'bold font-l', backgroundStyle: 'watchlist-cell-back-green', dataType: 'float', noOfDecimalPlaces: 0},
            bap: {id: 'dataObj.bap', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'offer', type: 'classicCell', firstValueStyle: 'down-fore-color bold font-l', backgroundStyle: 'watchlist-cell-back-red', sortKeyword: 'bap', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            baq: {id: 'dataObj.baq', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'offerQty', type: 'classicCell', firstValueStyle: 'bold font-l', backgroundStyle: 'watchlist-cell-back-red', sortKeyword: 'baq', dataType: 'float', noOfDecimalPlaces: 0},
            l52: {id: 'dataObj.l52', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'fiftyTwoWkL', type: 'classicCell', sortKeyword: 'l52', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            h52: {id: 'dataObj.h52', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'fiftyTwoWkH', type: 'classicCell', sortKeyword: 'h52', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            vol: {id: 'dataObj.vol', width: 85, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'volume', type: 'classicCell', sortKeyword: 'vol', firstValueStyle: 'fore-color bold font-l', dataType: 'int', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change', isBlink: true},
            tovr: {id: 'dataObj.tovr', width: 90, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'turnover', type: 'classicCell', sortKeyword: 'tovr', firstValueStyle: 'fore-color bold font-l', dataType: 'int', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change', isBlink: true},
            trades: {id: 'dataObj.trades', width: 65, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'trades', type: 'classicCell', sortKeyword: 'trades', firstValueStyle: 'fore-color bold font-l', dataType: 'int', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change', isBlink: true},
            prvCls: {id: 'dataObj.prvCls', width: 90, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'preClosed', type: 'classicCell', sortKeyword: 'prvCls', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            open: {id: 'dataObj.open', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'open', type: 'classicCell', sortKeyword: 'open', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            cit: {id: 'dataObj.cit', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'cashMap', type: 'classicProgressCell', secondId: 'dataObj.cot', sortKeyword: 'cit', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            ltd: {id: 'dataObj.ltd', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'lastTradedDate', type: 'classicCell', sortKeyword: 'ltd', firstValueStyle: 'fore-color bold font-l', dataType: 'date'},
            dltt: {id: 'dataObj.dltt', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'lastTradedTime', type: 'classicCell', sortKeyword: 'dltt', firstValueStyle: 'fore-color bold font-l'},
            high: {id: 'dataObj.high', width: 85, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'high', type: 'classicCell', sortKeyword: 'high', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            low: {id: 'dataObj.low', width: 85, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'low', type: 'classicCell', sortKeyword: 'low', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            cvwap: {id: 'dataObj.cvwap', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'cvwap', headerTitleName: 'cvwapDecs', type: 'classicCell', sortKeyword: 'cvwap', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            twap: {id: 'dataObj.twap', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'twap', headerTitleName: 'twapDesc', type: 'classicCell', sortKeyword: 'twap', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            min: {id: 'dataObj.min', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'min', type: 'classicCell', sortKeyword: 'min', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            max: {id: 'dataObj.max', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'max', type: 'classicCell', sortKeyword: 'max', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            sMin: {id: 'dataObj.sMin', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'sMin', type: 'classicCell', sortKeyword: 'smin', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            sMax: {id: 'dataObj.sMax', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'sMax', type: 'classicCell', sortKeyword: 'smax', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            intsV: {id: 'dataObj.intsV', width: 95, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'intrinsicValue', type: 'classicCell', sortKeyword: 'intsV', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            top: {id: 'dataObj.top', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'top', type: 'classicCell', sortKeyword: 'top', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            tov: {id: 'dataObj.tov', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'tov', type: 'classicCell', sortKeyword: 'tov', firstValueStyle: 'fore-color bold font-l', dataType: 'int'},
            tcp: {id: 'dataObj.tcp', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'tcp', type: 'classicCell', sortKeyword: 'tcp', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            tcv: {id: 'dataObj.tcv', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'tcv', type: 'classicCell', sortKeyword: 'tcv', firstValueStyle: 'fore-color bold', dataType: 'int'},
            isin: {id: 'dataObj.isin', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'isin', type: 'classicCell', sortKeyword: 'isin', firstValueStyle: 'fore-color bold'},
            instDes: {id: 'dataObj.instDes', width: 90, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'inst', type: 'classicCell', sortKeyword: 'inst', firstValueStyle: 'fore-color bold'},
            cls: {id: 'dataObj.cls', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'close', type: 'classicCell', sortKeyword: 'cls', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            refValue: {id: 'dataObj.refValue', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'refValue', type: 'classicCell', sortKeyword: 'tov', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            tbq: {id: 'dataObj.tbq', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'tbq', type: 'classicCell', sortKeyword: 'tbq', firstValueStyle: 'fore-color bold', dataType: 'int'},
            taq: {id: 'dataObj.taq', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'taq', type: 'classicCell', sortKeyword: 'taq', firstValueStyle: 'fore-color bold', dataType: 'int'},
            eps: {id: 'dataObj.eps', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'eps', type: 'classicCell', sortKeyword: 'eps', firstValueStyle: 'fore-color bold'},
            mktCap: {id: 'dataObj.mktCap', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'mktCap', type: 'classicCell', sortKeyword: 'mktCap', firstValueStyle: 'fore-color bold', dataType: 'int'},
            per: {id: 'dataObj.per', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'per', type: 'classicCell', sortKeyword: 'per', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            lstShares: {id: 'dataObj.lstShares', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'listedShr', type: 'classicCell', sortKeyword: 'lstShares', firstValueStyle: 'fore-color bold', dataType: 'int'},
            shreCap: {id: 'dataObj.shreCap', width: 115, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shareCapital', type: 'classicCell', sortKeyword: 'shreCap', firstValueStyle: 'fore-color bold', dataType: 'int'},
            vwap: {id: 'dataObj.vwap', width: 60, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'vWAP', headerTitleName: 'twapDesc', type: 'classicCell', sortKeyword: 'vWAP', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            sname: {id: 'dataObj.sname', width: 100, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'session', headerStyle: 'text-left-header', type: 'classicCell', sortKeyword: 'dataObj.sname', firstValueStyle: 'highlight-fore-color bold', cellStyle: 'text-left-header'},
            nms: {id: 'dataObj.nms', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'nms', headerTitleName: 'nms', type: 'classicCell', sortKeyword: 'dataObj.nms', firstValueStyle: 'fore-color bold', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            shortSellEnabled: {id: 'dataObj.shrtSelEnabld', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shortSellEnabled', headerTitleName: 'shortSellEnabled', sortKeyword: 'dataObj.shrtSelEnabld', type: 'classicTextCell', firstValueStyle: 'fore-color bold', dataType: 'string'},
            shortSellStatus: {id: 'dataObj.shrtSelStats', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shortSellStatus', headerTitleName: 'shortSellStatus', sortKeyword: 'dataObj.shrtSelStats', type: 'classicTextCell', firstValueStyle: 'fore-color bold', dataType: 'string'},
            shortSellQtyLimit: {id: 'dataObj.shortsellqtyLimit', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'shortSellQtyLimit', headerTitleName: 'shortSellQtyLimit', sortKeyword: 'dataObj.shortsellqtyLimit', type: 'classicTextCell', firstValueStyle: 'fore-color bold', dataType: 'int'},
            CBmaxprc: {id: 'dataObj.CBmaxprc', width: 120, headerName: 'circuitBreakerHigh', type: 'classicCell', sortKeyword: 'CBmaxprc', firstValueStyle: 'fore-color', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            CBminprc: {id: 'dataObj.CBminprc', width: 120, headerName: 'circuitBreakerLow', type: 'classicCell', sortKeyword: 'CBminprc', firstValueStyle: 'fore-color', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci', noOfSecValueDecimalPlaces: 'dataObj.deci'},
            ChgPctTOP: {id: 'dataObj.ChgPctTOP', width: 85, headerName: 'topPerChange', type: 'classicCell', sortKeyword: 'ChgPctTOP', dataType: 'float', firstValueStyle: 'fore-color', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            dispEndTime: {id: 'dataObj.dispEndTime', width: 100, headerName: 'newEndTime', type: 'classicCell', sortKeyword: 'dispEndTime', dataType: 'time', firstValueStyle: 'fore-color', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            dispTALTime: {id: 'dataObj.dispTALTime', width: 85, headerName: 'TALTime', type: 'classicCell', sortKeyword: 'dispTALTime', dataType: 'time', firstValueStyle: 'fore-color', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change'},
            symStatusStr: {id: 'dataObj.symStatusStr', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'status', sortKeyword: 'dataObj.shrtSelStats', type: 'classicTextCell', firstValueStyle: 'fore-color', dataType: 'string'},
            cid: {id: 'dataObj.cid', width: 90, headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold font-l text-left-header', headerName: 'symbolCode', headerStyle: 'text-left-header', type: 'classicCell', sortKeyword: 'cid', firstValueStyle: 'fore-color bold font-l', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change', isBlink: true},
            noOfPayment: {id: 'dataObj.noOfPayment', width: 110, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'noOfPayment', type: 'classicCell', sortKeyword: 'noOfPayment', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            cor: {id: 'dataObj.cor', width: 85, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'couponRate', type: 'classicCell', sortKeyword: 'cor', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            fVal: {id: 'dataObj.fVal', width: 85, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'faceValue', type: 'classicCell', sortKeyword: 'fVal', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            interestDayBasis: {id: 'dataObj.interestDayBasis', width: 125, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'interestDayBasis', type: 'classicCell', sortKeyword: 'interestDayBasis', firstValueStyle: 'fore-color bold font-l', dataType: 'float', noOfDecimalPlaces: 'dataObj.deci'},
            issueDate: {id: 'dataObj.issueDate', width: 80, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'issueDate', type: 'classicCell', sortKeyword: 'issueDate', firstValueStyle: 'fore-color bold font-l', dataType: 'date'},
            pcd: {id: 'dataObj.pcd', width: 105, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'lastCouponDate', type: 'classicCell', sortKeyword: 'pcd', firstValueStyle: 'fore-color bold font-l', dataType: 'date'},
            cd: {id: 'dataObj.cd', width: 105, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'nextCouponDate', type: 'classicCell', sortKeyword: 'cd', firstValueStyle: 'fore-color bold font-l', dataType: 'date'}
        },

        quoteColumnMapping: {
            dSym: {id: 'dSym', width: 65, headerName: 'symbol', secondId: 'sDes', headerStyle: 'text-left-header', sortKeyword: 'sDes', type: 'textIconCell'},
            trend: {id: 'trend', width: 22, name: 'trend', headerName: '', thirdId: 'trend', sortKeyword: 'chg', type: 'upDown'},
            ltp: {id: 'ltp', width: 48, headerName: 'last', sortKeyword: 'ltp', dataType: 'float', firstValueStyle: 'highlight-fore-color bold'},
            chg: {id: 'chg', width: 54, headerName: 'change', headerSecondName: 'perChange', secondId: 'pctChg', sortKeyword: 'chg', positiveNegativeChange: true, type: 'dualChange', dataType: 'float'},
            dispProp1: {id: 'dispProp1', width: 80, headerName: 'symbol', headerSecondName: '', headerThirdName: 'description', secondId: 'lDes', thirdId: 'open', headerStyle: 'text-left-header', sortKeyword: 'sDes', type: 'expandedSymbolCell', expandedWidthRatio: '0.5', defaultWidthRatio: 16 / 37, isndicatorAvailable: true},
            pctChg: {id: 'pctChg', width: 60, headerName: 'perChange', headerSecondName: 'change', headerThirdName: 'change', headerStyle: 'pad-m-r', secondId: 'chg', thirdId: 'prvCls', sortKeyword: 'chg', positiveNegativeChange: true, type: 'expandedChgCell', dataType: 'float', expandedWidthRatio: '0.25', defaultWidthRatio: 12 / 37}
        },

        quoteColumnIds: ['dSym', 'trend', 'ltp', 'chg'],

        defaultColumnIds: ['menu', 'sym', 'trend', 'ltp', 'chg', 'bbp', 'bap', 'l52', 'vol', 'tovr', 'trades', 'prvCls', 'cit', 'dltt', 'high'],

        classicColumnIds: ['menu', 'sym', 'sDes', 'trend', 'ltp', 'ltq', 'chg', 'pctChg', 'vol', 'bbp', 'bbq', 'bap', 'baq', 'trades', 'ltd', 'dltt', 'intsV', 'top', 'tov', 'open', 'high', 'low'],

        moreColumnIds: ['trend', 'ltp', 'chg', 'bbp', 'bap', 'l52', 'vol', 'tovr', 'trades', 'prvCls', 'cit', 'dltt', 'high', 'cvwap', 'max', 'top', 'tcp', 'mktCap', 'per', 'lstShares', 'shreCap', 'twap', 'vwap'],

        classicMoreColumnIds: ['sDes', 'lDes', 'exg', 'trend', 'isin', 'instDes', 'ltp', 'ltq', 'ltd', 'dltt', 'prvCls', 'chg', 'pctChg', 'vol', 'tovr', 'open', 'high', 'low', 'cls', 'bbp', 'bbq', 'bap', 'baq', 'h52', 'l52', 'trades', 'refValue', 'max', 'min', 'tbq', 'taq', 'eps', 'per', 'intsV', 'top', 'tov', 'cit', 'cvwap', 'twap', 'tcp', 'tcv', 'mktCap', 'lstShares', 'shreCap', 'vwap'],

        customDefaultColumnIds: ['menu', 'sym', 'exg', 'trend', 'ltp', 'chg', 'bbp', 'bap', 'l52', 'vol', 'tovr', 'trades', 'prvCls', 'cit', 'dltt', 'high'],

        customClassicColumnIds: ['menu', 'sym', 'sDes', 'exg', 'trend', 'ltp', 'ltq', 'chg', 'pctChg', 'bbp', 'bbq', 'bap', 'baq', 'vol', 'tovr', 'trades', 'cit', 'h52', 'l52', 'prvCls', 'open', 'ltd', 'dltt', 'high', 'low'],

        indexTableColumnIds: ['sym', 'sDes', 'trend', 'ltp', 'chg', 'pctChg', 'high', 'low', 'vol', 'tovr', 'trades', 'h52', 'l52', 'prvCls', 'open'],

        nonRemovableColumnIds: ['menu', 'sym'],

        classicAssetTypes: {
            0: ['menu', 'sym', 'sDes', 'trend', 'ltp', 'ltq', 'chg', 'pctChg', 'bbp', 'bbq', 'bap', 'baq', 'vol', 'tovr', 'trades', 'h52', 'l52', 'prvCls', 'open', 'cit', 'ltd', 'dltt', 'high', 'low'],    // Equity
            75: ['menu', 'sym', 'sDes', 'trend', 'ltp', 'ltq', 'chg', 'pctChg', 'bbp', 'bbq', 'bap', 'baq', 'vol', 'tovr', 'trades', 'prvCls', 'open', 'high', 'low'],    // Bonds (Fixed Income)
            68: ['menu', 'sym', 'sDes', 'trend', 'ltp', 'ltq', 'chg', 'pctChg', 'bbp', 'bbq', 'bap', 'baq', 'vol', 'tovr', 'trades', 'high', 'low'],  // Options/Future
            86: ['menu', 'sym', 'sDes', 'trend', 'ltp', 'ltq', 'chg', 'pctChg', 'bbp', 'bbq', 'bap', 'baq', 'vol', 'tovr', 'trades', 'high', 'low'],  // ETF (Mutual Funds)
            11: ['menu', 'sym', 'sDes', 'trend', 'ltp', 'ltq', 'chg', 'pctChg', 'bbp', 'bbq', 'bap', 'baq', 'vol', 'tovr', 'trades', 'high', 'low'],  // Currency
            7: ['menu', 'sym', 'sDes', 'trend', 'ltp', 'chg', 'pctChg', 'high', 'low', 'vol', 'tovr', 'trades', 'h52', 'l52', 'prvCls', 'open']  // Index
        },

        assetTypes: {
            0: ['menu', 'sym', 'trend', 'ltp', 'chg', 'bbp', 'bap', 'l52', 'vol', 'tovr', 'trades', 'prvCls', 'cit', 'dltt', 'high'],    // Equity
            75: ['menu', 'sym', 'trend', 'ltp', 'chg', 'bbp', 'bap', 'vol', 'tovr', 'trades', 'prvCls', 'high'],    // Bonds (Fixed Income)
            68: ['menu', 'sym', 'trend', 'ltp', 'chg', 'bbp', 'bap', 'vol', 'tovr', 'trades', 'high'],  // Options/Future
            86: ['menu', 'sym', 'trend', 'ltp', 'chg', 'bbp', 'bap', 'vol', 'tovr', 'trades', 'high'],  // ETF (Mutual Funds)
            11: ['menu', 'sym', 'trend', 'ltp', 'chg', 'bbp', 'bap', 'vol', 'tovr', 'trades', 'high'],  // Currency
            7: ['menu', 'sym', 'trend', 'ltp', 'chg', 'high', 'vol', 'tovr', 'trades', 'l52', 'prvCls']  // Index
        },

        tableParams: {
            MinHeaderHeight: {standard: 36, classic: 26},
            RowHeight: {standard: 42, classic: 26},
            MaxTableWidth: 5700,
            numOfFixedColumns: 2,
            isDisabledWlConditionalFormatting: false
        }
    },

    specialTrades: {
        defaultColumnMapping: {
            dDt: {id: 'dDt', width: 55, headerName: 'time', headerStyle: 'text-left-header', cellStyle: 'text-left-header font-m', sortKeyword: 'dDt', type: 'classic', firstValueStyle: 'fore-color bold'},
            sym: {id: 'dispProp1', width: 40, headerName: 'symbol', cellStyle: 'font-m symbol-fore-color text-left-header', sortKeyword: 'sym', type: 'classic', firstValueStyle: 'bold'},
            trp: {id: 'trp', width: 43, headerName: 'price', cellStyle: 'font-m', sortKeyword: 'trp', dataType: 'float', type: 'classic', firstValueStyle: 'highlight-fore-color bold'},
            trq: {id: 'trq', width: 50, headerName: 'quantity', cellStyle: 'font-m', sortKeyword: 'trq', dataType: 'int', type: 'classic', firstValueStyle: 'fore-color bold'},
            tick: {id: 'tick', width: 16, headerName: '', thirdId: 'tick', sortKeyword: 'tick', type: 'upDown', cellStyle: 'text-center'},
            trdType: {id: 'trdType', width: 40, headerName: '', sortKeyword: 'trdType', type: 'buySell', positiveNegativeChange: true}
        },

        defaultColumnIds: ['dDt', 'sym', 'trp', 'trq', 'tick', 'trdType'],

        tableParams: {
            MinHeaderHeight: 25,
            RowHeight: 25
        }
    },

    timeAndSales: {
        defaultColumnMapping: {     // Column Object parameters : id, width, headerName, sortKeyword, multiValueIds, cellStyle, sortDisable, firstValueStyle, isBold, dataType, backgroundColour,
            dDt: {id: 'dDt', width: 66, headerName: 'time', headerStyle: 'text-left-header', cellStyle: 'text-left-header', isColumnSortDisabled: true, type: 'classic', firstValueStyle: 'fore-color bold'},
            trp: {id: 'trp', width: 62, headerName: 'price', isColumnSortDisabled: true, dataType: 'float', type: 'classic', firstValueStyle: 'highlight-fore-color bold'},
            trq: {id: 'trq', width: 55, headerName: 'quantity', isColumnSortDisabled: true, dataType: 'int', type: 'classic', firstValueStyle: 'fore-color bold'},
            nChg: {id: 'nChg', width: 45, headerName: 'change', isColumnSortDisabled: true, dataType: 'float', type: 'classic', positiveNegativeChange: true},
            pctChg: {id: 'pctChg', width: 45, headerName: 'perChange', isColumnSortDisabled: true, dataType: 'float', type: 'classic', positiveNegativeChange: true, noOfDecimalPlaces: 2},
            splits: {id: 'splits', width: 22, headerName: 'splits', isColumnSortDisabled: true, dataType: 'int', type: 'classic', firstValueStyle: 'fore-color'},
            tick: {id: 'tick', width: 18, headerName: 'tick', thirdId: 'tick', isColumnSortDisabled: true, type: 'upDown', cellStyle: 'text-center'},
            trdType: {id: 'trdType', width: 45, headerName: 'side', isColumnSortDisabled: true, type: 'buySell', positiveNegativeChange: true}
        },

        defaultColumnIds: ['dDt', 'trp', 'trq', 'nChg', 'pctChg', 'splits', 'tick', 'trdType'],

        BacklogBatchSize: 2000,

        tableParams: {
            MinHeaderHeight: 25,
            RowHeight: 25
        }
    },

    marketTimeAndSales: {
        defaultColumnMapping: {     // Column Object parameters : id, width, headerName, sortKeyword, multiValueIds, cellStyle, sortDisable, firstValueStyle, isBold, dataType, backgroundColour,
            dDt: {id: 'dDt', width: 63, headerName: 'time', headerStyle: 'text-left-header', cellStyle: 'text-left-header', isColumnSortDisabled: true, type: 'classic', firstValueStyle: 'fore-color bold'},
            sym: {id: 'sym', width: 87, headerName: 'symbol', headerStyle: 'text-left-header', sortKeyword: 'sym', cellStyle: 'symbol-fore-color bold text-left-header', type: 'classic'},
            trp: {id: 'trp', width: 50, headerName: 'price', isColumnSortDisabled: true, dataType: 'float', type: 'classic', firstValueStyle: 'highlight-fore-color bold'},
            trq: {id: 'trq', width: 53, headerName: 'quantity', isColumnSortDisabled: true, dataType: 'int', type: 'classic', firstValueStyle: 'fore-color bold'},
            nChg: {id: 'nChg', width: 43, headerName: 'change', isColumnSortDisabled: true, dataType: 'float', type: 'classic', positiveNegativeChange: true},
            pctChg: {id: 'pctChg', width: 43, headerName: 'perChange', isColumnSortDisabled: true, dataType: 'float', type: 'classic', positiveNegativeChange: true, noOfDecimalPlaces: 2},
            splits: {id: 'splits', width: 25, headerName: 'splits', isColumnSortDisabled: true, dataType: 'int', type: 'classic', firstValueStyle: 'fore-color'},
            tick: {id: 'tick', width: 18, headerName: 'tick', thirdId: 'tick', isColumnSortDisabled: true, type: 'upDown', cellStyle: 'text-center'},
            trdType: {id: 'trdType', width: 35, headerName: 'side', isColumnSortDisabled: true, type: 'buySell', positiveNegativeChange: true}
        },

        defaultColumnIds: ['dDt', 'sym', 'trp', 'trq', 'nChg', 'pctChg', 'splits', 'tick', 'trdType'],

        BacklogBatchSize: 5000
    },

    quote: {
        panelIntraday: {
            // Equity
            '1': [
                {lanKey: 'lastTrade', dataField: 'ltp', formatter: 'C', style: 'highlight-fore-color'},
                {lanKey: 'lastQty', dataField: 'ltq', formatter: 'L', style: 'highlight-fore-color'},
                {lanKey: 'change', dataField: 'chg', formatter: 'C'},
                {lanKey: 'perChange', dataField: 'pctChg', formatter: 'C', noOfDecimals: 2},
                {lanKey: 'open', dataField: 'open', formatter: 'C'},
                {lanKey: 'close', dataField: 'cls', formatter: 'C'},
                {lanKey: 'preClosed', dataField: 'prvCls', formatter: 'C'},
                {lanKey: 'vWAP', dataField: 'vwap', formatter: 'C', detailQouteTitle: 'vwapDesc'},
                {lanKey: 'volume', dataField: 'vol', formatter: 'L', style: 'highlight-fore-color'},
                {lanKey: 'turnover', dataField: 'tovr', formatter: 'L', style: 'highlight-fore-color'},
                {lanKey: 'trades', dataField: 'trades', formatter: 'L', style: 'highlight-fore-color'},
                {lanKey: 'mktCap', dataField: 'mktCap', formatter: 'DN'},
                {lanKey: 'min', dataField: 'dispMin', formatter: 'C'},
                {lanKey: 'max', dataField: 'dispMax', formatter: 'C'},
                {lanKey: 'high', dataField: 'high', formatter: 'C'},
                {lanKey: 'low', dataField: 'low', formatter: 'C'},
                {lanKey: 'bid', dataField: 'bbp', formatter: 'C', style: 'up-fore-color'},
                {lanKey: 'offer', dataField: 'bap', formatter: 'C', style: 'down-fore-color'},
                {lanKey: 'bidQty', dataField: 'bbq', formatter: 'L', style: 'up-fore-color'},
                {lanKey: 'offerQty', dataField: 'baq', formatter: 'L', style: 'down-fore-color'},
                {lanKey: 'fiftyTwoWkH', dataField: 'h52', formatter: 'C'},
                {lanKey: 'fiftyTwoWkL', dataField: 'l52', formatter: 'C'},
                {lanKey: 'eps', dataField: 'eps', formatter: 'C', detailQouteTitle: 'epsDesc'},
                {lanKey: 'yield1', dataField: 'yld', formatter: 'C'},
                {lanKey: 'peRatio', dataField: 'per', formatter: 'C', detailQouteTitle: 'pByeRatio'},
                {lanKey: 'pbRatio', dataField: 'pbr', formatter: 'C', detailQouteTitle: 'pBybRatio'},
                {lanKey: 'dividend', dataField: 'div', formatter: 'I'},
                {lanKey: 'exDividendDate', dataField: 'edd', formatter: 'D'}
            ],

            // Fixed Income
            6: [
                {lanKey: 'lastTrade', dataField: 'ltp', formatter: 'C'},
                {lanKey: 'lastQty', dataField: 'ltq', formatter: 'L'},
                {lanKey: 'open', dataField: 'open', formatter: 'C'},
                {lanKey: 'close', dataField: 'cls', formatter: 'C'},
                {lanKey: 'preClosed', dataField: 'prvCls', formatter: 'C'},
                {lanKey: 'volume', dataField: 'vol', formatter: 'L'},
                {lanKey: 'turnover', dataField: 'tovr', formatter: 'L'},
                {lanKey: 'trades', dataField: 'trades', formatter: 'L'},
                {lanKey: 'bid', dataField: 'bbp', formatter: 'C', style: 'up-fore-color'},
                {lanKey: 'offer', dataField: 'bap', formatter: 'C', style: 'down-fore-color'},
                {lanKey: 'bidQty', dataField: 'bbq', formatter: 'L', style: 'up-fore-color'},
                {lanKey: 'offerQty', dataField: 'baq', formatter: 'L', style: 'down-fore-color'},
                {lanKey: 'couponRate', dataField: 'cor', formatter: 'C'},
                {lanKey: 'couponFreq', dataField: 'cof', formatter: 'C'},
                {lanKey: 'previousCouponDate', dataField: 'pcd', formatter: 'D'},
                {lanKey: 'faceValue', dataField: 'fVal', formatter: 'C'},
                {lanKey: 'maturityDate', dataField: 'matD', formatter: 'D'},
                {lanKey: 'yield1', dataField: 'yld', formatter: 'C'},
                {lanKey: 'bondType', dataField: 'boT', formatter: 'S'},
                {lanKey: 'issuedAmount', dataField: 'issueAmnt', formatter: 'C'},
                {lanKey: 'outstandingAmount', dataField: 'outA', formatter: 'DN'},
                {lanKey: 'settlementDate', dataField: 'setD', formatter: 'D'},
                {lanKey: 'dayCountMethod', dataField: 'dayCountMethod', formatter: 'S'}
            ],

            // Future
            4: [
                {lanKey: 'lastTrade', dataField: 'ltp', formatter: 'C'},
                {lanKey: 'lastQty', dataField: 'ltq', formatter: 'L'},
                {lanKey: 'open', dataField: 'open', formatter: 'C'},
                {lanKey: 'close', dataField: 'cls', formatter: 'C'},
                {lanKey: 'preClosed', dataField: 'prvCls', formatter: 'C'},
                {lanKey: 'volume', dataField: 'vol', formatter: 'L'},
                {lanKey: 'trades', dataField: 'trades', formatter: 'L'},
                {lanKey: 'bid', dataField: 'bbp', formatter: 'C', style: 'up-fore-color'},
                {lanKey: 'offer', dataField: 'bap', formatter: 'C', style: 'down-fore-color'},
                {lanKey: 'bidQty', dataField: 'bbq', formatter: 'L', style: 'up-fore-color'},
                {lanKey: 'offerQty', dataField: 'baq', formatter: 'L', style: 'down-fore-color'},
                {lanKey: 'strikePrice', dataField: 'stkP', formatter: 'C'},
                {lanKey: 'expiryDate', dataField: 'expDt', formatter: 'D'},
                {lanKey: 'lotSize', dataField: 'lot', formatter: 'I'},
                {lanKey: 'openInterest', dataField: 'oInt', formatter: 'C'},
                {lanKey: 'openInterestChange', dataField: 'oIntC', formatter: 'P'},
                {lanKey: 'settlementPrice', dataField: 'sp', formatter: 'C'},
                {lanKey: 'high', dataField: 'high', formatter: 'C'},
                {lanKey: 'low', dataField: 'low', formatter: 'C'}
            ],

            // Option
            3: [
                {lanKey: 'lastTrade', dataField: 'ltp', formatter: 'C'},
                {lanKey: 'lastQty', dataField: 'ltq', formatter: 'L'},
                {lanKey: 'open', dataField: 'open', formatter: 'C'},
                {lanKey: 'close', dataField: 'cls', formatter: 'C'},
                {lanKey: 'preClosed', dataField: 'prvCls', formatter: 'C'},
                {lanKey: 'volume', dataField: 'vol', formatter: 'L'},
                {lanKey: 'trades', dataField: 'trades', formatter: 'L'},
                {lanKey: 'bid', dataField: 'bbp', formatter: 'C', style: 'up-fore-color'},
                {lanKey: 'offer', dataField: 'bap', formatter: 'C', style: 'down-fore-color'},
                {lanKey: 'bidQty', dataField: 'bbq', formatter: 'L', style: 'up-fore-color'},
                {lanKey: 'offerQty', dataField: 'baq', formatter: 'L', style: 'down-fore-color'},
                {lanKey: 'strikePrice', dataField: 'stkP', formatter: 'C'},
                {lanKey: 'expiryDate', dataField: 'expDt', formatter: 'D'},
                {lanKey: 'lotSize', dataField: 'lot', formatter: 'I'},
                {lanKey: 'openInterest', dataField: 'oInt', formatter: 'C'},
                {lanKey: 'openInterestChange', dataField: 'oIntC', formatter: 'P'},
                {lanKey: 'settlementPrice', dataField: 'sp', formatter: 'C'},
                {lanKey: 'high', dataField: 'high', formatter: 'C'},
                {lanKey: 'low', dataField: 'low', formatter: 'C'}
            ],

            // Mutual Fund
            5: [
                {lanKey: 'lastTrade', dataField: 'ltp', formatter: 'C'},
                {lanKey: 'lastQty', dataField: 'ltq', formatter: 'L'},
                {lanKey: 'open', dataField: 'open', formatter: 'C'},
                {lanKey: 'close', dataField: 'cls', formatter: 'C'},
                {lanKey: 'preClosed', dataField: 'prvCls', formatter: 'C'},
                {lanKey: 'vWAP', dataField: 'vwap', formatter: 'C'},
                {lanKey: 'volume', dataField: 'vol', formatter: 'L'},
                {lanKey: 'turnover', dataField: 'tovr', formatter: 'L'},
                {lanKey: 'trades', dataField: 'trades', formatter: 'L'},
                {lanKey: 'mktCap', dataField: 'mktCap', formatter: 'DN'},
                {lanKey: 'bid', dataField: 'bbp', formatter: 'C', style: 'up-fore-color'},
                {lanKey: 'offer', dataField: 'bap', formatter: 'C', style: 'down-fore-color'},
                {lanKey: 'bidQty', dataField: 'bbq', formatter: 'L', style: 'up-fore-color'},
                {lanKey: 'offerQty', dataField: 'baq', formatter: 'L', style: 'down-fore-color'},
                {lanKey: 'dividend', dataField: 'div', formatter: 'I'},
                {lanKey: 'exDividendDate', dataField: 'edd', formatter: 'D'},
                {lanKey: 'high', dataField: 'high', formatter: 'C'},
                {lanKey: 'low', dataField: 'low', formatter: 'C'},
                {lanKey: 'fiftyTwoWkH', dataField: 'h52', formatter: 'C'},
                {lanKey: 'fiftyTwoWkL', dataField: 'l52', formatter: 'C'}
            ],

            // Currency
            7: [
                {lanKey: 'lastTrade', dataField: 'ltp', formatter: 'C'},
                {lanKey: 'open', dataField: 'open', formatter: 'C'},
                {lanKey: 'close', dataField: 'cls', formatter: 'C'},
                {lanKey: 'preClosed', dataField: 'prvCls', formatter: 'C'},
                {lanKey: 'high', dataField: 'high', formatter: 'C'},
                {lanKey: 'low', dataField: 'low', formatter: 'C'},
                {lanKey: 'fiftyTwoWkH', dataField: 'h52', formatter: 'C'},
                {lanKey: 'fiftyTwoWkL', dataField: 'l52', formatter: 'C'}
            ],

            // Index
            '8': [
                {lanKey: 'open', dataField: 'open', formatter: 'C'},
                {lanKey: 'close', dataField: 'cls', formatter: 'C'},
                {lanKey: 'preClosed', dataField: 'prvCls', formatter: 'C'},
                {lanKey: 'volume', dataField: 'vol', formatter: 'L'},
                {lanKey: 'turnover', dataField: 'tovr', formatter: 'L'},
                {lanKey: 'trades', dataField: 'trades', formatter: 'L'},
                {lanKey: 'high', dataField: 'high', formatter: 'C'},
                {lanKey: 'low', dataField: 'low', formatter: 'C'},
                {lanKey: 'fiftyTwoWkH', dataField: 'h52', formatter: 'C'},
                {lanKey: 'fiftyTwoWkL', dataField: 'l52', formatter: 'C'}
            ]
        },

        panelFundamental: {
            // Equity
            '1': [
                {lanKey: 'eps', dataField: 'eps', formatter: 'C'},
                {lanKey: 'yield1', dataField: 'yld', formatter: 'C'},
                {lanKey: 'peRatio', dataField: 'per', formatter: 'C'},
                {lanKey: 'pbRatio', dataField: 'pbr', formatter: 'C'},
                {lanKey: 'dividend', dataField: 'div', formatter: 'I'},
                {lanKey: 'exDividendDate', dataField: 'edd', formatter: 'D'}
            ],

            // Fixed Income
            6: [
                {lanKey: 'couponRate', dataField: 'cor', formatter: 'C'},
                {lanKey: 'couponFreq', dataField: 'cof', formatter: 'C'},
                {lanKey: 'previousCouponDate', dataField: 'pcd', formatter: 'D'},
                {lanKey: 'faceValue', dataField: 'fVal', formatter: 'C'},
                {lanKey: 'maturityDate', dataField: 'matD', formatter: 'D'},
                {lanKey: 'yield1', dataField: 'yld', formatter: 'C'},
                {lanKey: 'bondType', dataField: 'boT', formatter: 'S'},
                {lanKey: 'issuedAmount', dataField: 'issueAmnt', formatter: 'C'},
                {lanKey: 'outstandingAmount', dataField: 'outA', formatter: 'C'},
                {lanKey: 'settlementDate', dataField: 'setD', formatter: 'D'},
                {lanKey: 'dayCountMethod', dataField: 'dayCountMethod', formatter: 'S'}
            ],

            // Future
            4: [
                {lanKey: 'strikePrice', dataField: 'stkP', formatter: 'C'},
                {lanKey: 'expiryDate', dataField: 'expDt', formatter: 'D'},
                {lanKey: 'lotSize', dataField: 'lot', formatter: 'I'},
                {lanKey: 'openInterest', dataField: 'oInt', formatter: 'C'},
                {lanKey: 'openInterestChange', dataField: 'oIntC', formatter: 'P'},
                {lanKey: 'settlementPrice', dataField: 'sp', formatter: 'C'}
            ],

            // Option
            3: [
                {lanKey: 'strikePrice', dataField: 'stkP', formatter: 'C'},
                {lanKey: 'expiryDate', dataField: 'expDt', formatter: 'D'},
                {lanKey: 'lotSize', dataField: 'lot', formatter: 'I'},
                {lanKey: 'openInterest', dataField: 'oInt', formatter: 'C'},
                {lanKey: 'openInterestChange', dataField: 'oIntC', formatter: 'P'},
                {lanKey: 'settlementPrice', dataField: 'sp', formatter: 'C'}
            ],

            // Mutual Fund
            5: [
                {lanKey: 'dividend', dataField: 'div', formatter: 'I'},
                {lanKey: 'exDividendDate', dataField: 'edd', formatter: 'D'}
            ],

            // Currency
            7: [],

            // Index
            '8': []
        }
    },

    globalSearch: {
        maxResultsForGroup: 10,

        groups: {
            topHits: {rank: 1, groupName: 'Top hits', type: 'T'},
            // Equity
            1: {rank: 2, groupName: 'Equity', lanKey: 'equity', type: 1},
            // Fixed Income
            6: {rank: 3, groupName: 'Fixed Income', lanKey: 'fixedIncome', type: 6},
            // Future
            4: {rank: 4, groupName: 'Future', lanKey: 'future', type: 4},
            // Option
            3: {rank: 5, groupName: 'Option', lanKey: 'option', type: 3},
            // Mutual Fund
            5: {rank: 6, groupName: 'Mutual Fund', lanKey: 'mutualFund', type: 5},
            // Index
            8: {rank: 7, groupName: 'Index', lanKey: 'index', type: 8},
            other: {rank: 8, groupName: 'Other', lanKey: 'other', type: 'D'}
        }
    },

    alert: {
        criteria: [
            {value: '>', lanKey: 'greaterThan'},
            {value: '>=', lanKey: 'greaterThanOrEqual'},
            {value: '<', lanKey: 'lessThan'},
            {value: '<=', lanKey: 'lessThanOrEqual'},
            {value: '=', lanKey: 'equal'}
        ],

        alertCondition: [
            {value: '0', lanKey: 'Match All'},
            {value: '1', lanKey: 'Match Any'}
        ],

        frequency: [
            {value: '1', lanKey: 'Once Only'},
            {value: '2', lanKey: 'Once a day'}
        ],

        parameters: [
            {value: 'bbp', lanKey: 'bestBid', field: 'BEST_BID', isDecimalAllowed: true},
            {value: 'bap', lanKey: 'bestOffer', field: 'BEST_ASK', isDecimalAllowed: true},
            {value: 'baq', lanKey: 'offerQty', field: 'BEST_ASK_QTY', isDecimalAllowed: false},
            {value: 'bbq', lanKey: 'bidQty', field: 'BEST_BID_QTY', isDecimalAllowed: false},
            {value: 'vol', lanKey: 'volume', field: 'VOLUME', isDecimalAllowed: false},
            {value: 'chg', lanKey: 'change', field: 'CHANGE', isDecimalAllowed: true},
            {value: 'ltp', lanKey: 'last', field: 'LAST_TRADE_PRICE', isDecimalAllowed: true},
            {value: 'ltq', lanKey: 'lastQty', field: 'LAST_TRADE_QTY', isDecimalAllowed: true},
            {value: 'pctChg', lanKey: 'perChange', field: 'PCT_CHANGE', isDecimalAllowed: true}
        ],

        paramMap: {
            BEST_BID: 'bestBid',
            BEST_ASK: 'bestOffer',
            BEST_ASK_QTY: 'offerQty',
            BEST_BID_QTY: 'bidQty',
            VOLUME: 'volume',
            CHANGE: 'change',
            PCT_CHANGE: 'perChange'
        }
    },

    alertHistory: {
        defaultColumnMapping: {
            contextMenu: {id: 'contextMenu', width: 30, headerCellView: 'Ember.ExpandedHeaderCell', headerName: '', headerStyle: 'text-center', isColumnSortDisabled: true, type: 'alertContextMenu', buttonFunction: 'updateAlert'},
            sym: {id: 'sym', width: 50, headerCellView: 'Ember.ExpandedHeaderCell', headerName: 'symbol', secondId: 'lDes', thirdId: 'open', headerStyle: 'text-left-header font-m', sortKeyword: 'sDes', type: 'alertSymbol'},
            crit: {id: 'crit', width: 80, headerCellView: 'Ember.ExpandedHeaderCell', headerName: 'condition', headerStyle: 'text-left-header font-m', sortKeyword: 'crit', type: 'alertCriteria'},
            status: {id: 'status', width: 50, headerCellView: 'Ember.ExpandedHeaderCell', headerName: 'status', headerStyle: 'text-left-header font-m', sortKeyword: 'status', type: 'alertStatus'}
        },

        defaultColumnIds: ['contextMenu', 'sym', 'crit', 'status']
    },

    topStocks: {
        // TopGainersByChange
        0: {
            fields: [
                {filed: 'symbol', objName: 'stock.dispProp1', fontColor: 'symbol-fore-color', textAlign: 'h-left', bold: 'bold', padding: 'pad-widget-left'},
                {filed: 'description', objName: 'stock.sDes', fontColor: 'fade-fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
                {filed: 'last', objName: 'ltp', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'change', objName: 'chg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberWithDeci', bold: 'bold', padding: 'pad-m-l'},
                {filed: 'perChange', objName: 'pctChg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberPercentage', padding: 'pad-m-l'},
                {filed: 'volume', objName: 'vol', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'trades', objName: 'trades', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'turnover', objName: 'tovr', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l pad-widget-right'}
            ],
            title: 'topGainers',
            icon: 'glyphicon-triangle-top up-fore-color',
            showTopStockTabs: true
        },
        // TopGainersByPercentageChange
        1: {
            fields: [
                {filed: 'symbol', objName: 'stock.dispProp1', fontColor: 'symbol-fore-color', textAlign: 'h-left', bold: 'bold', padding: 'pad-widget-left'},
                {filed: 'description', objName: 'stock.sDes', fontColor: 'fade-fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
                {filed: 'last', objName: 'ltp', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'change', objName: 'chg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'perChange', objName: 'pctChg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberPercentage', bold: 'bold', padding: 'pad-m-l'},
                {filed: 'volume', objName: 'vol', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'trades', objName: 'trades', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'turnover', objName: 'tovr', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l pad-widget-right'}
            ],
            title: 'topGainers',
            icon: 'glyphicon-triangle-top up-fore-color',
            showTopStockTabs: true
        },
        // TopLosersByChange
        2: {
            fields: [
                {filed: 'symbol', objName: 'stock.dispProp1', fontColor: 'symbol-fore-color', textAlign: 'h-left', bold: 'bold', padding: 'pad-widget-left'},
                {filed: 'description', objName: 'stock.sDes', fontColor: 'fade-fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
                {filed: 'last', objName: 'ltp', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'change', objName: 'chg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberWithDeci', bold: 'bold', padding: 'pad-m-l'},
                {filed: 'perChange', objName: 'pctChg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberPercentage', padding: 'pad-m-l'},
                {filed: 'volume', objName: 'vol', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'trades', objName: 'trades', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'turnover', objName: 'tovr', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l pad-widget-right'}
            ],
            title: 'topLosers',
            icon: 'glyphicon-triangle-bottom down-fore-color',
            showTopStockTabs: true
        },
        // TopLosersByPercentageChange
        3: {
            fields: [
                {filed: 'symbol', objName: 'stock.dispProp1', fontColor: 'symbol-fore-color', textAlign: 'h-left', bold: 'bold', padding: 'pad-widget-left'},
                {filed: 'description', objName: 'stock.sDes', fontColor: 'fade-fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
                {filed: 'last', objName: 'ltp', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'change', objName: 'chg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'perChange', objName: 'pctChg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberPercentage', bold: 'bold', padding: 'pad-m-l'},
                {filed: 'volume', objName: 'vol', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'trades', objName: 'trades', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l'},
                {filed: 'turnover', objName: 'tovr', fontColor: 'fore-color', textAlign: 'h-right', formatter: 'formatNumber', padding: 'pad-m-l pad-widget-right'}
            ],
            title: 'topLosers',
            icon: 'glyphicon-triangle-bottom down-fore-color',
            showTopStockTabs: true
        },
        // MostActiveByVolume
        4: {
            fields: [
                {filed: 'symbol', objName: 'stock.dispProp1', fontColor: 'symbol-fore-color', textAlign: 'h-left', bold: 'bold', padding: 'pad-widget-left'},
                {filed: 'description', objName: 'stock.sDes', fontColor: 'fade-fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
                {filed: 'last', objName: 'ltp', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'change', objName: 'chg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'perChange', objName: 'pctChg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberPercentage', padding: 'pad-m-l'},
                {filed: 'volume', objName: 'vol', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumber', bold: 'bold', padding: 'pad-m-l pad-widget-right'}

            ],
            title: 'MActiveByVol',
            showTopStockTabs: false
        },
        // MostActiveByTrades
        5: {
            fields: [
                {filed: 'symbol', objName: 'stock.dispProp1', fontColor: 'symbol-fore-color', textAlign: 'h-left', bold: 'bold', padding: 'pad-widget-left'},
                {filed: 'description', objName: 'stock.sDes', fontColor: 'fade-fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
                {filed: 'last', objName: 'ltp', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'change', objName: 'chg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'perChange', objName: 'pctChg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberPercentage', padding: 'pad-m-l'},
                {filed: 'trades', objName: 'trades', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumber', bold: 'bold', padding: 'pad-m-l pad-widget-right'}
            ],
            title: 'MActiveByTrades',
            showTopStockTabs: false
        },
        // MostActiveByTurnover
        6: {
            fields: [
                {filed: 'symbol', objName: 'stock.dispProp1', fontColor: 'symbol-fore-color', textAlign: 'h-left', bold: 'bold', padding: 'pad-widget-left'},
                {filed: 'description', objName: 'stock.sDes', fontColor: 'fade-fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
                {filed: 'last', objName: 'ltp', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'change', objName: 'chg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
                {filed: 'perChange', objName: 'pctChg', fontColor: 'redOrGreen', textAlign: 'h-right ltr', formatter: 'formatNumberPercentage', padding: 'pad-m-l'},
                {filed: 'turnover', objName: 'tovr', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumber', bold: 'bold', padding: 'pad-m-l pad-widget-right'}
            ],
            title: 'MActiveByTurnover',
            showTopStockTabs: false
        }
    },

    gms: [
        {sym: 'EBROUSDBR.SP', exg: 'GLOBAL', inst: '0', sDes: 'Brent Crude', icon: 'comm-icon icon-brent-crude'},
        {sym: 'EWTIUSDBR.SP', exg: 'GLOBAL', inst: '0', sDes: 'WTI Crude', icon: 'comm-icon icon-wti-crude'},
        {sym: 'SXAUUSDOZ.SP', exg: 'GLOBAL', inst: '0', sDes: 'Gold', icon: 'comm-icon icon-gold'},
        {sym: 'SXAGUSDOZ.SP', exg: 'GLOBAL', inst: '0', sDes: 'Silver', icon: 'comm-icon icon-silver'},
        {sym: 'EURSAR', exg: 'GLOBAL', inst: '0', sDes: 'EURSAR', icon: 'comm-icon icon-euro'}
    ],

    fairValue: {
        fields: [
            {field: 'date', fieldName: 'date', fontColor: 'fore-color', textAlign: 'h-left', formatter: 'formatToDate', padding: 'pad-m-l'},
            {field: 'researchHouse', fieldName: 'source', fontColor: 'fore-color', textAlign: 'h-left', col: 'layout-col-24', padding: 'pad-m-l'},
            {field: 'recommendation', fieldName: 'ratingName', isCellHighlight: true, fontColor: 'fore-color', textAlign: 'h-middle', padding: 'pad-s-lr'},
            {field: 'targetPrice', fieldName: 'fv', fontColor: 'highlight-fore-color', textAlign: 'h-right', formatter: 'formatNumberWithDeci', padding: 'pad-m-l'},
            {field: 'upPotential', fieldName: 'upsidePotential', isHide: true, padding: 'pad-m-l'},
            {field: 'report', fieldName: 'report', isHide: true, padding: 'pad-m-lr'}
        ]
    },

    topvWatchlist: {
        defaultColumns: {
            sym: {id: 'stock.dSym', width: 87, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', sortKeyword: 'stock.sym', cellStyle: 'fore-color text-left-header', type: 'classicCell'},  // width:94px for worst case scenario
            sDes: {id: 'stock.sDes', width: 105, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'sDescription', headerStyle: 'text-left-header', sortKeyword: 'stock.sDes', cellStyle: 'text-left-header', type: 'classicCell', firstValueStyle: 'bold fore-color'},
            ltp: {id: 'stock.top', width: 85, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'toPrice', sortKeyword: 'stock.top', dataType: 'float', firstValueStyle: 'highlight-fore-color bold', backgroundStyle: 'watchlist-cell-back-lastqty', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, type: 'classicCell'},
            pctChg: {id: 'pctChg', width: 75, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'toPerChange', sortKeyword: 'pctChg', positiveNegativeChange: true, type: 'changeCell', dataType: 'float'},
            chg: {id: 'chg', width: 50, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'toChange', sortKeyword: 'chg', positiveNegativeChange: true, type: 'changeCell', dataType: 'float'},
            ltq: {id: 'stock.tov', width: 65, headerCellView: 'Ember.ClassicHeaderCell', headerName: 'toQty', sortKeyword: 'stock.tov', dataType: 'int', firstValueStyle: 'highlight-fore-color bold', type: 'classicCell'}
        },

        tableParams: {
            MaxTableWidth: 5700,
            numOfFixedColumns: 0
        }
    },

    optionChain: {
        defaultColumnMapping: { // Column Object parameters : id, width, headerName, sortKeyword, multiValueIds, cellStyle, sortDisable, firstValueStyle, isBold, dataType, backgroundColour,
            cDisSym: {id: 'cDisSym', width: 135, headerName: 'callSym', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'classicCell'},
            cLtp: {id: 'cLtp', width: 60, headerName: 'callLtp', headerStyle: 'text-left-header', dataType: 'float', firstValueStyle: 'highlight-fore-color bold', backgroundStyle: 'watchlist-cell-back-lastqty', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, type: 'classicCell'},
            cChg: {id: 'cChg', width: 55, headerName: 'callChg', headerStyle: 'text-left-header', positiveNegativeChange: true, type: 'changeCell', dataType: 'float'},
            cBbp: {id: 'cBbp', width: 60, headerName: 'callBestBid', headerStyle: 'text-left-header', type: 'classicCell', firstValueStyle: 'up-fore-color bold', backgroundStyle: 'watchlist-cell-back-green', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, dataType: 'float'},
            cBap: {id: 'cBap', width: 60, headerName: 'callBestAsk', headerStyle: 'text-left-header', type: 'classicCell', firstValueStyle: 'down-fore-color bold', backgroundStyle: 'watchlist-cell-back-red', sortKeyword: 'bap', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, dataType: 'float'},
            cVol: {id: 'cVol', width: 65, headerName: 'callVol', headerStyle: 'text-left-header', type: 'classicCell', firstValueStyle: 'fore-color bold', dataType: 'int', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change', isBlink: true},
            strkPrc: {id: 'strkPrc', width: 75, headerName: 'strikePrice', headerStyle: 'text-left-header', dataType: 'float', firstValueStyle: 'highlight-fore-color bold', backgroundStyle: 'watchlist-cell-back-lastqty', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, type: 'classicCell'},
            pDisSym: {id: 'pDisSym', width: 135, headerName: 'putSym', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'classicCell'},
            pLtp: {id: 'pLtp', width: 60, headerName: 'putLtp', headerStyle: 'text-left-header', dataType: 'float', firstValueStyle: 'highlight-fore-color bold', backgroundStyle: 'watchlist-cell-back-lastqty', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, type: 'classicCell'},
            pChg: {id: 'pChg', width: 55, headerName: 'putChg', headerStyle: 'text-left-header', positiveNegativeChange: true, type: 'changeCell', dataType: 'float'},
            pBbp: {id: 'pBbp', width: 60, headerName: 'putBestBid', headerStyle: 'text-left-header', type: 'classicCell', firstValueStyle: 'up-fore-color bold', backgroundStyle: 'watchlist-cell-back-green', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, dataType: 'float'},
            pBap: {id: 'pBap', width: 60, headerName: 'putBestAsk', headerStyle: 'text-left-header', type: 'classicCell', firstValueStyle: 'down-fore-color bold', backgroundStyle: 'watchlist-cell-back-red', sortKeyword: 'bap', blinkUpStyle: 'blink-classic-up', blinkDownStyle: 'blink-classic-down', isBlink: true, dataType: 'float'},
            pVol: {id: 'pVol', width: 65, headerName: 'putVol', headerStyle: 'text-left-header', type: 'classicCell', firstValueStyle: 'fore-color bold', dataType: 'int', blinkUpStyle: 'blink-font-style-change', blinkDownStyle: 'blink-font-style-change', isBlink: true}
        },

        defaultColumnIds: ['cDisSym', 'cLtp', 'cChg', 'cBbp', 'cBap', 'cVol', 'strkPrc', 'pDisSym', 'pLtp', 'pChg', 'pBbp', 'pBap', 'pVol']
    },

    marketOverviewSummary: {
        defaultColumnMapping: {     // Column Object parameters : id, width, headerName, sortKeyword, multiValueIds, cellStyle, sortDisable, firstValueStyle, isBold, dataType, backgroundColour,
            isExpanded: {id: 'isExpanded', width: 10, headerName: '', cellStyle: 'fore-color text-left-header', type: 'tree', firstValueStyle: 'colour-normal bold', buttonFunction: 'onRowExpand'},
            flag: {id: 'flag', width: 25, type: 'flagCell', firstValueStyle: 'colour-normal bold'},
            exg: {id: 'de', secondId: 'marketId', width: 68, headerName: 'exchange', headerStyle: 'text-left-header', sortKeyword: 'exg', cellStyle: 'fore-color text-left-header', type: 'tree', firstValueStyle: 'colour-normal bold'},
            des: {id: 'des', secondId: 'lDes', width: 135, headerName: 'description', headerStyle: 'text-left-header', sortKeyword: 'des', cellStyle: 'fore-color text-left-header', type: 'tree', firstValueStyle: 'colour-normal bold'},
            vol: {id: 'vol', width: 85, headerName: 'volume', sortKeyword: 'vol', cellStyle: 'prominent-fore-color', dataType: 'int', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            tovr: {id: 'tovr', width: 90, headerName: 'turnover', sortKeyword: 'tovr', cellStyle: 'prominent-fore-color', dataType: 'int', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            trades: {id: 'trades', width: 65, headerName: 'trades', sortKeyword: 'trades', cellStyle: 'prominent-fore-color', dataType: 'int', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            ups: {id: 'ups', width: 54, headerName: 'ups', sortKeyword: 'ups', cellStyle: 'up-fore-color', dataType: 'int', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            dwns: {id: 'dwns', width: 54, headerName: 'down', sortKeyword: 'dwns', cellStyle: 'down-fore-color', dataType: 'int', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            nChg: {id: 'nChg', width: 65, headerName: 'unchanged', sortKeyword: 'nChg', cellStyle: 'prominent-fore-color', dataType: 'int', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            statStr: {id: 'statStr', secondId: 'stat', width: 60, headerName: 'status', headerStyle: 'text-left-header', sortKeyword: 'statStr', cellStyle: 'fore-color text-left-header', type: 'marketStatusCell', firstValueStyle: 'colour-normal bold'},
            lDes: {id: 'lDes', width: 90, headerName: 'description', headerStyle: 'text-left-header', sortKeyword: 'des', cellStyle: 'fore-color text-left-header', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            date: {id: 'date', width: 65, headerName: 'date', sortKeyword: 'date', dataType: 'date', cellStyle: 'prominent-fore-color', type: 'classicCell', firstValueStyle: 'colour-normal bold'},
            time: {id: 'adjustedMktTime', width: 65, headerName: 'time', sortKeyword: 'time', cellStyle: 'prominent-fore-color', type: 'classicCell', firstValueStyle: 'colour-normal bold'}
        },

        defaultColumnIds: ['isExpanded', 'flag', 'exg', 'des', 'vol', 'tovr', 'trades', 'ups', 'dwns', 'nChg', 'statStr']
    },

    subMarketSummary: {
        defaultColumnMapping: {
            lDes: {id: 'lDes', width: 80, headerName: 'description', headerStyle: 'text-left-header', sortKeyword: 'des', cellStyle: 'fore-color text-left-header', type: 'classicCell', firstValueStyle: 'colour-normal bold market-summary-font'},
            volTovr: {id: 'vol', width: 75, headerName: 'volume', headerSecondName: 'turnover', secondId: 'tovr', type: 'dual', sortKeyword: 'vol', firstValueStyle: 'highlight-fore-color bold market-summary-font', secondValueStyle: 'highlight-fore-color bold market-summary-font', dataType: 'float', noOfSecValueDecimalPlaces: 0, noOfDecimalPlaces: 0},
            upsDwns: {id: 'ups', width: 44, headerName: 'ups', headerSecondName: 'down', secondId: 'dwns', type: 'dual', sortKeyword: 'ups', firstValueStyle: 'up-fore-color bold market-summary-font', secondValueStyle: 'down-fore-color bold market-summary-font', dataType: 'float', noOfSecValueDecimalPlaces: 0, noOfDecimalPlaces: 0}
        },

        defaultColumnIds: ['lDes', 'volTovr', 'upsDwns'],

        tableParams: {
            MinHeaderHeight: 36,
            RowHeight: 42
        }
    },

    financialRatios: {
        types: [
            {value: 'BS', lanKey: 'balanceSheet'},
            {value: 'IS', lanKey: 'incomeStatement'},
            {value: 'CF', lanKey: 'cashFlow'}
        ]
    },

    financialRatiosPeriods: {
        types: [
            {value: '1,2,3,4', lanKey: 'quarterly'},
            {value: '5', lanKey: 'annually'}
        ]
    },

    financials: {
        defaultColumns: [     // Column Object parameters : id, width, headerName, sortKeyword, multiValueIds, cellStyle, sortDisable, firstValueStyle, isBold, dataType, backgroundColour,
            {id: 'desc', headerName: 'description', headerStyle: 'text-left-header', width: 230, cellStyle: 'text-left-header', isColumnSortDisabled: true, type: 'financialTitleCell', firstValueStyle: 'ltr symbol-fore-color bold ellipsis'}
        ]
    },

    ratios: {
        defaultColumns: [     // Column Object parameters : id, width, headerName, sortKeyword, multiValueIds, cellStyle, sortDisable, firstValueStyle, isBold, dataType, backgroundColour,
            {id: 'desc', headerName: 'description', headerStyle: 'text-left-header', width: 230, cellStyle: 'text-left-header', isColumnSortDisabled: true, type: 'dualCell', firstValueStyle: 'ltr symbol-fore-color bold ellipsis'}
        ]
    },

    topStock: {
        defaultColumnMapping: { // Column Object parameters : id, width, headerName, sortKeyword, multiValueIds, cellStyle, sortDisable, firstValueStyle, isBold, dataType, backgroundColour,
            sym: {id: 'val.stock.dispProp1', width: 80, headerName: 'symbol', headerStyle: 'text-left-header', sortKeyword: 'des', cellStyle: 'fore-color text-left-header', type: 'classicCell', firstValueStyle: 'colour-normal bold market-summary-font'},
            chg: {id: 'val.chg', width: 80, headerName: 'change', sortKeyword: 'des', type: 'changeCell', dataType: 'float', noOfDecimalPlaces: 'val.stock.deci', firstValueStyle: 'colour-normal bold market-summary-font'},
            desc: {id: 'val.stock.sDes', width: 80, headerName: 'description', headerStyle: 'text-left-header', sortKeyword: 'des', cellStyle: 'fore-color text-left-header', type: 'classicTextCell', firstValueStyle: 'colour-normal bold market-summary-font'},
            ltp: {id: 'val.ltp', width: 80, headerName: 'last', sortKeyword: 'des', type: 'dualArrow', dataType: 'float', noOfDecimalPlaces: 'val.stock.deci', firstValueStyle: 'highlight-fore-color bold font-l',},
            pctChg: {id: 'val.pctChg', width: 80, headerName: 'perChange', sortKeyword: 'des', type: 'changeCell', dataType: 'float', noOfDecimalPlaces: 2, firstValueStyle: 'colour-normal bold market-summary-font'},
            vol: {id: 'val.vol', width: 80, headerName: 'volume', sortKeyword: 'des', type: 'classicCell', dataType: 'int', firstValueStyle: 'colour-normal bold market-summary-font'},
            trades: {id: 'val.trades', width: 80, headerName: 'trading', sortKeyword: 'des', type: 'classicCell', dataType: 'float', noOfDecimalPlaces: 0, firstValueStyle: 'colour-normal bold market-summary-font'},
            tovr: {id: 'val.tovr', width: 80, headerName: 'turnover', sortKeyword: 'des', type: 'classicCell', dataType: 'float', noOfDecimalPlaces: 'val.stock.deci', firstValueStyle: 'colour-normal bold market-summary-font'}
        },

        defaultColumnIdsArr: {
            0 : {
                defaultColumnIds: ['sym', 'desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                moreColumnIds: ['desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                nonRemovableColumnIds: ['sym']
            },
            1 : {
                defaultColumnIds: ['sym', 'desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                moreColumnIds: ['desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                nonRemovableColumnIds: ['sym']
            },
            2 : {
                defaultColumnIds: ['sym', 'desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                moreColumnIds: ['desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                nonRemovableColumnIds: ['sym']
            },
            3 : {
                defaultColumnIds: ['sym', 'desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                moreColumnIds: ['desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                nonRemovableColumnIds: ['sym']
            },
            4 : {
                defaultColumnIds: ['sym', 'desc', 'ltp', 'chg', 'pctChg', 'vol'],
                moreColumnIds: ['desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                nonRemovableColumnIds: ['sym']
            },
            5 : {
                defaultColumnIds: ['sym', 'desc', 'ltp', 'chg', 'pctChg', 'trades'],
                moreColumnIds: ['desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                nonRemovableColumnIds: ['sym']
            },
            6 : {
                defaultColumnIds: ['sym', 'desc', 'ltp', 'chg', 'pctChg', 'tovr'],
                moreColumnIds: ['desc', 'ltp', 'chg', 'pctChg', 'vol', 'trades', 'tovr'],
                nonRemovableColumnIds: ['sym']
            },
        },

        tableParams: {
            MinHeaderHeight: 25,
            RowHeight: 25,
            numOfFixedColumns: 4,
        }
    },

    // TODO: [Atheesan] Remove this after getting widgets dynamically
    WidgetList: {
        selection: {code: 'custom-workspace.widget-selection', des: 'Select Widget', desc: 'selectWidget', icon: 'glyphicon glyphicon-plus'},

        quote: [
            {code: 'price.widgets.quote-market-depth', des: 'Depth by Order', args: {mode: 2}, desc: 'depthByOrder', icon: 'glyphicon glyphicon-stats'},
            {code: 'price.widgets.quote-market-depth', des: 'Depth by Price', args: {mode: 1}, desc: 'depthByPrice', icon: 'glyphicon glyphicon-stats'},
            {code: 'price.widgets.quote-intraday-performance', des: 'Detail Quote', desc: 'detailQuote', icon: 'glyphicon icon-list-ul'},
            {code: 'chart.pro-chart', des: 'Pro Chart', desc: 'proChartTitle', icon: 'glyphicon icon-graph'},
            {code: 'chart.regular-chart', des: 'Quote Chart', desc: 'quoteChart', icon: 'glyphicon icon-graph'},
            {code: 'price.widgets.quote-summery', des: 'Quote Summary', desc: 'quoteSummary', icon: 'glyphicon glyphicon-book'},
            {code: 'price.widgets.announcement.symbol-announcement', des: 'Symbol News & Announcement', desc: 'symNewsAnn', icon: 'glyphicon glyphicon-bullhorn'},
            {code: 'price.widgets.time-and-sales.quote-time-and-sales', des: 'Time and Sales', desc: 'timeAndSales', icon: 'glyphicon glyphicon-time'}
        ],

        company: [
            {code: 'price.widgets.company-profile.company-basic-info', des: 'Company Profile', desc: 'companyInfor', icon: 'glyphicon glyphicon-info-sign'},
            {code: 'price.widgets.company-profile.company-management-info', des: 'Company Management', desc: 'mngtNBrdMbrs', icon: 'glyphicon glyphicon-cog'},
            {code: 'price.widgets.company-profile.company-owners-info', des: 'Company Owners', desc: 'owners', icon: 'glyphicon glyphicon-user'},
            {code: 'price.widgets.company-profile.company-subsidiaries-info', des: 'Company Subsidiaries', desc: 'subsidiaries', icon: 'glyphicon glyphicon-tree-deciduous'}
        ],

        market: [
            {code: 'price.widgets.commodities-overview', des: 'GMS', desc: 'gms', icon: 'glyphicon glyphicon-globe'},
            {code: 'price.widgets.heatmap', des: 'Heat Map', desc: 'heatMap', icon: 'glyphicon icon-sitemap'},
            {code: 'price.widgets.announcement.exchange-announcement', des: 'Latest News & Announcement', desc: 'latestNewsAnn', icon: 'glyphicon glyphicon-bullhorn'},
            {code: 'price.widgets.announcement.announcement-list', des: 'News & Announcement', desc: 'newsAnnouncement', icon: 'glyphicon glyphicon-bullhorn'},
            {code: 'price.widgets.sector-overview', des: 'Sector Overview', desc: 'sectorOverview', icon: 'glyphicon glyphicon-tint'},
            {code: 'price.widgets.top-stocks', des: 'Top Stocks', desc: 'topStocks', icon: 'glyphicon icon-thumbs-o-up'},
            {code: 'price.widgets.watch-list.watch-list', des: 'Watch List', desc: 'watchList', icon: '	glyphicon glyphicon-eye-open'}
        ],

        trade: [],

        transfer: [],

        mutualFund: [],

        optionChain: [],

        userProfile: []
    },

    stockScreener: {
        defaultColumnMapping: {
            symbol: {id: 'sym', width: 7, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header cursor-default', cellStyle: 'fore-color text-left-header cursor-default', type: 'classicCell'},
            sDes: {id: 'sDes', width: 10, headerName: 'description', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header cursor-default', cellStyle: 'fore-color text-left-header cursor-default', type: 'classicCell'},
            sector: {id: 'sec', width: 7, headerName: 'sector', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header cursor-default', cellStyle: 'fore-color text-left-header cursor-default', type: 'classicCell'},
            price: {id: 'ltp', width: 7, headerName: 'price', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            mktCap: {id: 'mktCap', width: 15, headerName: 'mktCap', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            DY: {id: 'yld', width: 7, headerName: 'dy', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            PE: {id: 'per', width: 15, headerName: 'peRatio', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default ellipsis', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            PB: {id: 'pbr', width: 15, headerName: 'pbRatio', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            EPS: {id: 'eps', width: 8, headerName: 'eps', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            CDV: {id: 'vol', width: 12, headerName: 'cdv', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            beta: {id: 'beta', width: 7, headerName: 'beta', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'},
            YTDP: {id: 'pctYtd', width: 12, headerName: 'ytd', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header cursor-default ellipsis', cellStyle: 'fore-color text-right-header cursor-default', type: 'classicCell'}
        },

        defaultColumnIds: ['symbol', 'sDes', 'sector', 'price', 'mktCap', 'DY', 'PE', 'PB', 'EPS', 'CDV', 'beta', 'YTDP']
    },

    fundamentalScore: {
        defaultColumnMapping: {
            symbol: {id: 'sym', width: 15, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'classicCell', firstValueStyle: 'ltr symbol-fore-color bold ellipsis'},
            sDes: {id: 'sDes', width: 40, headerName: 'description', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'classicCell'},
            currentFS: {id: 'fs', width: 15, headerName: 'currentFS', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header', cellStyle: 'fore-color text-right-header', type: 'fsColorCell', firstValueStyle: 'ltr bold'},
            FS1D: {id: 'fs1d', width: 15, headerName: 'oneDayAgo', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header', cellStyle: 'fore-color text-right-header', type: 'fsColorCell', firstValueStyle: 'ltr bold'},
            FS2D: {id: 'fs2d', width: 10, headerName: 'twoDaysAgo', dataType: 'float', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-right-header', cellStyle: 'fore-color text-right-header', type: 'fsColorCell', firstValueStyle: 'ltr bold'}
        },

        defaultColumnIds: ['symbol', 'sDes', 'currentFS', 'FS1D', 'FS2D']
    },

    techScore: {
        techScoreTable: {
            defaultColumnMapping: {
                date: {id: 'displayDate', headerName: 'date', sortKeyword: 'date', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'classicCell', width: 6},
                sigIcon: {id: 'sigIcon', headerName: '', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'technicalScoreColorCell', width: 3},
                desc: {id: 'desc', headerName: 'description', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'classicCell', width: 15},
                remainDate: {id: 'remainDate', headerName: '', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'classicCell', width: 8},
                signal: {id: 'displaySignal', headerName: 'signal', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color text-left-header', type: 'technicalScoreColorCell', width: 6}
            },

            defaultColumnIds: ['date', 'sigIcon', 'remainDate', 'desc', 'signal']
        },

        techScoreConstants: {
            signalAvailableIndicators: ['BOLLINGER_BAND', 'WILLIAMS_PCT_R', 'MACD', 'CHAIKIN_MONEY_FLOW', 'PRICE_ROC', 'PARABOLIC_SAR', 'CHAIKIN_AD_OSCILLATOR', 'CHANDE_MOMENTUM_OSCILLATOR', 'COMMODITY_CHANNEL_INDEX', 'DEMA', 'RELATIVE_STRENGTH_INDEX', 'FAST_STOCHASTICS', 'INTRADAY_MOMENTUM_INDEX', 'MOMENTUM', 'MONEY_FLOW_INDEX', 'MOVING_AVERAGE', 'PRICE_OSCILLATOR', 'QSTICK', 'RELATIVE_MOMENTUM_INDEX', 'RELATIVE_VELOCITY_INDEX', 'SLOW_STOCHASTICS', 'STOCHASTIC_MOMENTUM_INDEX', 'TEMA', 'TRIX', 'VOLUME_OSCILLATOR'],
            BOLLINGER_BAND: {techName: 'Bollinger Bands (20, Simple, 2)', qsTecScr: 'TECH_SCORE_BB', qsSignal: 'BS_SIG_BB', mixSignal: 'SIG_BB', mixTecScr: 'TS_BB', baseInd: 'INDC_BB'},
            WILLIAMS_PCT_R: {techName: 'Williams %R(14)', qsTecScr: 'TECH_SCORE_WILLR', qsSignal: 'BS_SIG_WILLR', mixSignal: 'SIG_WILLR', mixTecScr: 'TS_WILLR', baseInd: 'INDC_WILLR'},
            MACD: {techName: 'MACD (12-26, 9)', qsTecScr: 'TECH_SCORE_MACD', qsSignal: 'BS_SIG_MACD', mixSignal: 'SIG_MACD', mixTecScr: 'TS_MACD', baseInd: 'INDC_MACD'},
            CHAIKIN_MONEY_FLOW: {techName: 'Chaikin Money Flow(21)', qsTecScr: 'TECH_SCORE_CHKN_MF', qsSignal: 'BS_SIG_CHKN_MF', mixSignal: 'SIG_CHKNMF', mixTecScr: 'TS_CHKNMF', baseInd: 'INDC_CHKN_MF'},
            PRICE_ROC: {techName: 'Price ROC', qsTecScr: 'TECH_SCORE_PRICE_ROC', qsSignal: 'BS_SIG_PRICE_ROC', mixSignal: 'SIG_PXROC', mixTecScr: 'TS_PXROC', baseInd: 'INDC_PRICE_ROC'},
            PARABOLIC_SAR: {techName: 'Parabolic SAR (0.02, 0.2)', qsTecScr: 'TECH_SCORE_PARABL_SAR', qsSignal: 'BS_SIG_PARABL_SAR', mixSignal: 'SIG_PABSAR', mixTecScr: 'TS_PABSAR', baseInd: 'INDC_PARABL_SAR'},
            CHAIKIN_AD_OSCILLATOR: {techName: 'Chaikin A/D Oscillator', qsTecScr: 'TECH_SCORE_CHKN_AD_OSC', qsSignal: 'BS_SIG_CHKN_AD_OSC', mixSignal: 'SIG_CHKOSC', mixTecScr: 'TS_CHKOSC', baseInd: 'INDC_CHKN_AD_OSC'},
            CHANDE_MOMENTUM_OSCILLATOR: {techName: 'Chande Momentum Oscillator(Close,20)', qsTecScr: 'TECH_SCORE_CHAND_OSC', qsSignal: 'BS_SIG_CHAND_OSC', mixSignal: 'SIG_CHNOSC', mixTecScr: 'TS_CHNOSC', baseInd: 'INDC_CHAND_OSC'},
            COMMODITY_CHANNEL_INDEX: {techName: 'Commodity Channel Index(20)', qsTecScr: 'TECH_SCORE_CMMOD_CH_BS_SIG', qsSignal: 'BS_SIG_CMMOD_CH_BS_SIG', mixSignal: 'SIG_CMDOCH', mixTecScr: 'TS_CMDOCH', baseInd: 'INDC_CMMOD_CH_IND'},
            DEMA: {techName: 'DEMA(Close,21)', qsTecScr: 'TECH_SCORE_DEMA', qsSignal: 'BS_SIG_DEMA', mixSignal: 'SIG_DEMA', mixTecScr: 'TS_DEMA', baseInd: 'INDC_DEMA'},
            RELATIVE_STRENGTH_INDEX: {techName: 'Relative Strength Index (14)', qsTecScr: 'TECH_SCORE_RSI', qsSignal: 'BS_SIG_RSI', mixSignal: 'SIG_RSI', mixTecScr: 'TS_RSI', baseInd: 'INDC_RSI'},
            FAST_STOCHASTICS: {techName: 'Fast Stochastics (14, 3)', qsTecScr: 'TECH_SCORE_FAST_STOCH', qsSignal: 'BS_SIG_FAST_STOCH', mixSignal: 'SIG_FASTO', mixTecScr: 'TS_FASTO', baseInd: 'INDC_FAST_STOCH'},
            INTRADAY_MOMENTUM_INDEX: {techName: 'Intraday Momentum Index (14)', qsTecScr: 'TECH_SCORE_INTRADAY_MNTM_BS_SIG', qsSignal: 'BS_SIG_INTRADAY_MNTM_BS_SIG', mixSignal: 'SIG_IMNTM', mixTecScr: 'TS_IMNTM', baseInd: 'INDC_INTRADAY_MNTM_IND'},
            MOMENTUM: {techName: 'Momentum (12)', qsTecScr: 'TECH_SCORE_MOMENTUM', qsSignal: 'BS_SIG_MOMENTUM', mixSignal: 'SIG_MOMNT', mixTecScr: 'TS_MOMNT', baseInd: 'INDC_MOMENTUM'},
            MONEY_FLOW_INDEX: {techName: 'Money Flow Index(14)', qsTecScr: 'TECH_SCORE_MONEY_FLW_BS_SIG', qsSignal: 'BS_SIG_MONEY_FLW_BS_SIG', mixSignal: 'SIG_MF', mixTecScr: 'TS_MF', baseInd: 'INDC_MONEY_FLW_IND'},
            MOVING_AVERAGE: {techName: 'Moving Average - 2 Line (5, 20)', qsTecScr: 'TECH_SCORE_MV_AVG', qsSignal: 'BS_SIG_MV_AVG', mixSignal: 'SIG_MVAVG', mixTecScr: 'TS_MVAVG', baseInd: 'INDC_MV_AVG'},
            PRICE_OSCILLATOR: {techName: 'Price Oscillator', qsTecScr: 'TECH_SCORE_PRICE_OSC', qsSignal: 'BS_SIG_PRICE_OSC', mixSignal: 'SIG_PXOSC', mixTecScr: 'TS_PXOSC', baseInd: 'INDC_PRICE_OSC'},
            QSTICK: {techName: 'QStick (8)', qsTecScr: 'TECH_SCORE_QSTIC', qsSignal: 'BS_SIG_QSTIC', mixSignal: 'SIG_QSTIC', mixTecScr: 'TS_QSTIC', baseInd: 'INDC_QSTIC'},
            RELATIVE_MOMENTUM_INDEX: {techName: 'Relative Momentum Index (20,5)', qsTecScr: 'TECH_SCORE_RLTV_MNTM_BS_SIG', qsSignal: 'BS_SIG_RLTV_MNTM_BS_SIG', mixSignal: 'SIG_RLTMNT', mixTecScr: 'TS_RLTMNT', baseInd: 'INDC_RLTV_MNTM_IND'},
            RELATIVE_VELOCITY_INDEX: {techName: 'Relative Volatility Index (14)', qsTecScr: 'TECH_SCORE_RLTV_VOLATILITY_BS_SIG', qsSignal: 'BS_SIG_RLTV_VOLATILITY_BS_SIG', mixSignal: 'SIG_RLTVOL', mixTecScr: 'TS_RLTVOL', baseInd: 'INDC_RLTV_VOLATILITY_IND'},
            SLOW_STOCHASTICS: {techName: 'Slow Stochastics (14, 3)', qsTecScr: 'TECH_SCORE_SLOW_STOCH', qsSignal: 'BS_SIG_SLOW_STOCH', mixSignal: 'SIG_SLSTO', mixTecScr: 'TS_SLSTO', baseInd: 'INDC_SLOW_STOCH'},
            STOCHASTIC_MOMENTUM_INDEX: {techName: 'Stochastic Momentum Index (5,3,3)', qsTecScr: 'TECH_SCORE_STOCHASTICS_MNTM_BS_SIG', qsSignal: 'BS_SIG_STOCHASTICS_MNTM_BS_SIG', mixSignal: 'SIG_SMTNM', mixTecScr: 'TS_SMTNM', baseInd: 'INDC_STOCHASTICS_MNTM_IND'},
            TEMA: {techName: 'TEMA(Close,21)', qsTecScr: 'TECH_SCORE_TEMA', qsSignal: 'BS_SIG_TEMA', mixSignal: 'SIG_TEMA', mixTecScr: 'TS_TEMA', baseInd: 'INDC_TEMA'},
            TRIX: {techName: 'Trix(9)', qsTecScr: 'TECH_SCORE_TRIX', qsSignal: 'BS_SIG_TRIX', mixSignal: 'SIG_TRIX', mixTecScr: 'TS_TRIX', baseInd: 'INDC_TRIX'},
            VOLUME_OSCILLATOR: {techName: 'Volume Oscillator (2,5,Exponential)', qsTecScr: 'TECH_SCORE_VOL_OSC', qsSignal: 'BS_SIG_VOL_OSC', mixSignal: 'SIG_VOLOSC', mixTecScr: 'TS_VOLOSC', baseInd: 'INDC_VOL_OSC'}
        },

        techScoreConfig: {
            signals: ['BOLLINGER_BAND', 'WILLIAMS_PCT_R', 'MACD', 'CHAIKIN_MONEY_FLOW', 'PRICE_ROC', 'PARABOLIC_SAR', 'CHAIKIN_AD_OSCILLATOR', 'CHANDE_MOMENTUM_OSCILLATOR', 'COMMODITY_CHANNEL_INDEX', 'DEMA', 'RELATIVE_STRENGTH_INDEX', 'FAST_STOCHASTICS', 'INTRADAY_MOMENTUM_INDEX', 'MOMENTUM', 'MONEY_FLOW_INDEX', 'MOVING_AVERAGE', 'PRICE_OSCILLATOR', 'QSTICK', 'RELATIVE_MOMENTUM_INDEX', 'RELATIVE_VELOCITY_INDEX', 'SLOW_STOCHASTICS', 'STOCHASTIC_MOMENTUM_INDEX', 'TEMA', 'TRIX', 'VOLUME_OSCILLATOR']
        }
    },

    buyersSellers: {
        buyerColumnMapping: {
            sDes: {id: 'brokerDes', width: 30, headerName: 'broker', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            lDes: {id: 'lDes', width: 30, headerName: 'brokerName', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            vol: {id: 'vol', width: 20, headerName: 'buyVol', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'up-fore-color bold', type: 'classicCell', dataType: 'int'},
            avg: {id: 'avg', width: 20, headerName: 'buyAvg', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'},
            val: {id: 'val', width: 30, headerName: 'buyVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'up-fore-color bold', type: 'classicCell', dataType: 'float'},
            avgPct: {id: 'avgPct', width: 15, headerName: 'avgPct', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'}
        },

        sellerColumnMapping: {
            sDes: {id: 'brokerDes', width: 30, headerName: 'broker', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            lDes: {id: 'lDes', width: 30, headerName: 'brokerName', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            vol: {id: 'vol', width: 20, headerName: 'sellVol', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'down-fore-color bold', type: 'classicCell', dataType: 'int'},
            avg: {id: 'avg', width: 20, headerName: 'sellAvg', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'},
            val: {id: 'val', width: 30, headerName: 'sellVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'down-fore-color bold', type: 'classicCell', dataType: 'float'},
            avgPct: {id: 'avgPct', width: 15, headerName: 'avgPct', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'}
        },

        defaultColumnIds: ['sDes', 'lDes', 'vol', 'avg', 'val', 'avgPct']
    },

    brokerActivities: {
        buyingStocksColumnMapping: {
            sym: {id: 'sym', width: 30, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            symDes: {id: 'symDes', width: 70, headerName: 'description', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            vol: {id: 'vol', width: 20, headerName: 'buyVol', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'up-fore-color bold', type: 'classicCell', dataType: 'int'},
            avg: {id: 'avg', width: 20, headerName: 'buyAvg', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'},
            val: {id: 'val', width: 30, headerName: 'buyVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'up-fore-color bold', type: 'classicCell', dataType: 'float'},
            avgPct: {id: 'avgPct', width: 15, headerName: 'avgPct', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'}
        },

        sellingStocksColumnMapping: {
            sym: {id: 'sym', width: 30, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            symDes: {id: 'symDes', width: 70, headerName: 'description', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            vol: {id: 'vol', width: 20, headerName: 'sellVol', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'down-fore-color bold', type: 'classicCell', dataType: 'int'},
            avg: {id: 'avg', width: 20, headerName: 'sellAvg', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'},
            val: {id: 'val', width: 30, headerName: 'sellVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'down-fore-color bold', type: 'classicCell', dataType: 'float'},
            avgPct: {id: 'avgPct', width: 15, headerName: 'avgPct', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float'}
        },

        defaultColumnIds: ['sym', 'symDes', 'vol', 'avg', 'val', 'avgPct']
    },

    brokerRanking: {
        defaultColumnMapping: {
            rank: {id: 'rank', width: 15, headerName: 'brokerRanking', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'rank'},
            sDes: {id: 'brokerDes', width: 20, headerName: 'broker', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            lDes: {id: 'lDes', width: 20, headerName: 'brokerName', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            total: {id: 'total', width: 15, headerName: 'totalValue', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'total'},
            pctVal: {id: 'pctVal', width: 15, headerName: 'avgPct', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float', sortKeyword: 'pctVal'},
            buyVal: {id: 'buyVal', width: 20, headerName: 'buyVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'up-fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'buyVal'},
            sellVal: {id: 'sellVal', width: 20, headerName: 'sellVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'down-fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'sellVal'},
            netVal: {id: 'netVal', width: 20, headerName: 'netVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'netVal', positiveNegativeChange: true},
            crossVal: {id: 'crossVal', width: 20, headerName: 'crossVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'crossVal'},
            blockVal: {id: 'blockVal', width: 15, headerName: 'blockVal', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'blockVal'},
            trade: {id: 'trade', width: 15, headerName: 'trading', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int', sortKeyword: 'trade'}
        },

        defaultColumnIds: ['rank', 'sDes', 'lDes', 'total', 'pctVal', 'buyVal', 'sellVal', 'netVal', 'crossVal', 'blockVal', 'trade']
    },

    projectedPrice: {
        gainersColumnMapping: {
            sym: {id: 'dSym', width: 10, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            price: {id: 'prjPrc', width: 10, headerName: 'price', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'up-fore-color bold', type: 'classicCell', dataType: 'float'},
            pctChg: {id: 'prjPcng', width: 10, headerName: 'perChange', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'up-fore-color bold', type: 'classicCell', dataType: 'float'},
            vol: {id: 'prjVol', width: 10, headerName: 'volume', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int'},
            val: {id: 'prjVal', width: 10, headerName: 'value', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float', sortKeyword: 'prjVal'}
        },

        unchangedColumnMapping: {
            sym: {id: 'dSym', width: 10, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            price: {id: 'prjPrc', width: 10, headerName: 'price', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fade-fore-color bold', type: 'classicCell', dataType: 'float'},
            pctChg: {id: 'prjPcng', width: 10, headerName: 'perChange', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fade-fore-color bold', type: 'classicCell', dataType: 'float', sortKeyword: 'prjPcng'},
            vol: {id: 'prjVol', width: 10, headerName: 'volume', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int'},
            val: {id: 'prjVal', width: 10, headerName: 'value', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float', sortKeyword: 'prjVal'}
        },

        losersColumnMapping: {
            sym: {id: 'dSym', width: 10, headerName: 'symbol', headerCellView: 'Ember.ClassicHeaderCell', headerStyle: 'text-left-header', cellStyle: 'fore-color bold text-left-header', type: 'classicCell'},
            price: {id: 'prjPrc', width: 10, headerName: 'price', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'down-fore-color bold', type: 'classicCell', dataType: 'float'},
            pctChg: {id: 'prjPcng', width: 10, headerName: 'perChange', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'down-fore-color bold', type: 'classicCell', dataType: 'float'},
            vol: {id: 'prjVol', width: 10, headerName: 'volume', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'int'},
            val: {id: 'prjVal', width: 10, headerName: 'value', headerCellView: 'Ember.ClassicHeaderCell', cellStyle: 'fore-color bold', type: 'classicCell', dataType: 'float', sortKeyword: 'prjVal'}
        },

        defaultColumnIds: ['sym', 'price', 'pctChg', 'vol', 'val']
    }
};