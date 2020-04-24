import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'money'
})
export class MoneyPipe implements PipeTransform {
    private static roundTo(n: number, digits = 2): number {
        const mult = Math.pow(10, digits);
        n          = parseFloat((n * mult).toFixed(11));
        const test = (Math.round(n) / mult);
        return parseFloat(test.toFixed(digits));
    }

    transform(value: number, symbol = '$'): string {
        if (value === 0) {
            return 'N/A';
        }

        const billion  = 1000000000;
        const million  = 1000000;
        const thousand = 1000;

        if (value >= billion) {
            return `${symbol} ${MoneyPipe.roundTo(value / billion)} billions`;
        } else if (value >= million) {
            return `${symbol} ${MoneyPipe.roundTo(value / million)} millions`;
        } else if (value >= thousand) {
            return `${symbol} ${MoneyPipe.roundTo(value / thousand)} thousands`;
        }

        return `${symbol} ${value}`;
    }
}
