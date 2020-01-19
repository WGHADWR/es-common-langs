"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const finance = {
    /**
     * Format
     * @param value
     * @param places
     * @param symbol
     * @param thousand
     * @param decimal
     */
    format(value, places = 2, symbol = '￥', thousand = ',', decimal = '.') {
        value = value || 0;
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : '$';
        thousand = thousand || ',';
        decimal = decimal || '.';
        const negative = value < 0 ? '-' : '';
        const $value = Math.abs(+value || 0).toFixed(places);
        const i = `${parseInt($value, 10)}`;
        let j = i.length;
        j = j > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : '')
            + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousand}`)
            + (places ? decimal + Math.abs(value - parseFloat(i)).toFixed(places).slice(2) : '');
    },
};
exports.default = finance;
