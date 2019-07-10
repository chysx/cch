/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:15:59
 */

export class SyncParameter {
    private uploadUniqueIdValues: string[];
    private uploadName: string;
    private downloadParameterValues: Array<string>[];
    private commonMap = new Map<string, string>();

    putCommon(key: string, value: string): SyncParameter {
        this.commonMap.set(key, value);
        return this;
    }

    putUploadUniqueIdValues(...uploadUniqueIdValues: string[]): SyncParameter {
        this.uploadUniqueIdValues = uploadUniqueIdValues;
        return this;
    }

    getUploadUniqueIdValues(): string[] {
        return this.uploadUniqueIdValues;
    }

    putDownloadParameterValues(...downloadParameterValues: Array<string>[]): SyncParameter {
        this.downloadParameterValues = downloadParameterValues;
        return this;
    }

    getDownloadParameterValues(): Array<string>[] {
        return this.downloadParameterValues;
    }

    putUploadName(uploadName: string, uploadNameList?: Array<string>): SyncParameter {
        this.uploadName = uploadName;

        if (uploadNameList) {
            let sb = '';
            for (const item of uploadNameList) {
                sb = sb.concat(item).concat(',');
            }
            if (sb.length > 0) {
                this.uploadName = sb.substring(0, sb.length - 1);
            }
        }
        return this;
    }

    getUploadName(): string {
        return this.uploadName;
    }

    getCommon(key: string): string {
        return this.commonMap.get(key);
    }
}
