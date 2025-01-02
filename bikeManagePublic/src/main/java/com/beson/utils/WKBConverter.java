package com.beson.utils;

import org.geotools.geometry.jts.WKBReader;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.ParseException;


public class WKBConverter {
    public static byte[] wkbStringToByteArray(String wkbString) {
        // 将十六进制WKB字符串转换为字节数组
        return hexStringToByteArray(wkbString);
    }

    public static Geometry wkbStringToGeometry(String wkbString) throws ParseException {
        // 使用GeoTools的WKBReader
        WKBReader reader = new WKBReader();
        byte[] wkbBytes = hexStringToByteArray(wkbString);
        return reader.read(wkbBytes);
    }

    private static byte[] hexStringToByteArray(String hexString) {
        int len = hexString.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(hexString.charAt(i), 16) << 4)
                    + Character.digit(hexString.charAt(i+1), 16));
        }
        return data;
    }
}