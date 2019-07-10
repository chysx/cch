/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:16:59
 */
import {IParserFlow} from './IParserFlow';
import {IParsePolicy} from './IParsePolicy';

export abstract class AbstractParser<T> implements IParserFlow<T> {
    protected parsePolicy: IParsePolicy;

    setParsePolicy(parsePolicy: IParsePolicy) {
        this.parsePolicy = parsePolicy;
    }

    abstract parse(syncDataBean: T): Promise<boolean>;
}
