/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/3:15:20
 */

export enum UrlConfig {
    PRD,
    UAT,
    QAS,
    DEV
}

export class UrlDev {
    public static readonly HOST = '180.166.98.86';
    public static readonly PORT = '1089';
    public static readonly IS_SSL = false;
}

export class UrlQas {
    public static readonly HOST = '40.89.153.240';
    public static readonly PORT = '1080';
    public static readonly IS_SSL = false;
}

export class UrlUat {
    public static readonly HOST = '40.89.153.240';
    public static readonly PORT = '1088';
    public static readonly IS_SSL = false;
}

export class UrlPrd {
    public static readonly HOST = '40.89.153.240';
    public static readonly PORT = '1090';
    public static readonly IS_SSL = false;
}

export class HttpConfig {
    private static readonly SCHEME_HTTP = 'http://';
    private static readonly SCHEME_HTTPS = 'https://';

    public static urlConfig = UrlConfig.DEV;

    public static getHost(): string {
        switch (HttpConfig.urlConfig) {
            case UrlConfig.DEV:
                return UrlDev.HOST;
            case UrlConfig.UAT:
                return UrlUat.HOST;
            case UrlConfig.QAS:
                return UrlQas.HOST;
            case UrlConfig.PRD:
                return UrlPrd.HOST;
        }
        return UrlDev.HOST;
    }

    public static getPort(): string {
        switch (HttpConfig.urlConfig) {
            case UrlConfig.DEV:
                return UrlDev.PORT;
            case UrlConfig.QAS:
                return UrlQas.PORT;
            case UrlConfig.UAT:
                return UrlUat.PORT;
            case UrlConfig.PRD:
                return UrlPrd.PORT;
        }
        return UrlDev.PORT;
    }

    public static getScheme(): string {
        switch (HttpConfig.urlConfig) {
            case UrlConfig.DEV:
                if (UrlDev.IS_SSL) {
                    return HttpConfig.SCHEME_HTTPS;
                } else {
                    return HttpConfig.SCHEME_HTTP;
                }
            case UrlConfig.QAS:
                if (UrlQas.IS_SSL) {
                    return HttpConfig.SCHEME_HTTPS;
                } else {
                    return HttpConfig.SCHEME_HTTP;
                }
            case UrlConfig.UAT:
                if (UrlUat.IS_SSL) {
                    return HttpConfig.SCHEME_HTTPS;
                } else {
                    return HttpConfig.SCHEME_HTTP;
                }
            case UrlConfig.PRD:
                if (UrlPrd.IS_SSL) {
                    return HttpConfig.SCHEME_HTTPS;
                } else {
                    return HttpConfig.SCHEME_HTTP;
                }
        }
        return HttpConfig.SCHEME_HTTP;
    }

    public static isSsl(): boolean {
        return HttpConfig.getScheme() === (HttpConfig.SCHEME_HTTPS);
    }

}

export class Url {
    public static SCHEME = HttpConfig.getScheme();
    public static HOST = HttpConfig.getHost();
    public static PORT = HttpConfig.getPort();

    public static API(): string {
        return Url.SCHEME + Url.HOST + ':' + Url.PORT;
    }
}

export class FileUrl {
    public static SCHEME = HttpConfig.getScheme();
    public static HOST = HttpConfig.getHost();
    public static PORT = HttpConfig.getPort();
    public static METHOD = '/FileService/AndroidFileService.svc/MobileUploadFile';

    private static API(): string {
        return FileUrl.SCHEME + FileUrl.HOST + ':' + FileUrl.PORT + FileUrl.METHOD;
    }
}

export class DirectionUrl {
    public static HOST = 'maps.googleapis.com';
    public static SCHEME = 'https://';
    public static METHOD = '/maps/api/directions/json?';
    public static API = DirectionUrl.SCHEME + DirectionUrl.HOST + DirectionUrl.METHOD;
}

export class TimeOut {
    public static readonly CONNECT_TIMEOUT = 120 * 1000;
    public static readonly READ_TIMEOUT = 120 * 1000;
    public static readonly WRITE_TIMEOUT = 120 * 1000;
}


