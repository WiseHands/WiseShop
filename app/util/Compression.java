package util;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.GZIPOutputStream;

import play.Logger;
import play.mvc.Http;
import play.mvc.Http.Request;

import com.googlecode.htmlcompressor.compressor.HtmlCompressor;
import com.googlecode.htmlcompressor.compressor.XmlCompressor;
import com.googlecode.htmlcompressor.compressor.YuiCssCompressor;
import com.googlecode.htmlcompressor.compressor.YuiJavaScriptCompressor;

/**
 * @see http://code.google.com/p/htmlcompressor/
 * @see http://developer.yahoo.com/yui/compressor/
 * @see https://github.com/playframework/play/pull/240
 */
public class Compression {
    private static HtmlCompressor htmlCompressor = new HtmlCompressor();
    private static YuiCssCompressor cssCompressor = new YuiCssCompressor();
    private static YuiJavaScriptCompressor jsCompressor = new YuiJavaScriptCompressor();
    private static XmlCompressor xmlCompressor = new XmlCompressor();

    static {
        htmlCompressor.setRemoveIntertagSpaces(true);
        htmlCompressor.setCompressCss(true);
    }

    private static List<String> excludedActions = new ArrayList<String>();


    /**
     * returns the standard exclusion key for a request:
     * "minifymod.compress.exclude.action." + action
     */
    public static String getCompressionExcludeKey(Request request) {
        return getCompressionExcludeKey(request.action);
    }

    /**
     * returns the standard exclusion key for an action:
     * "minifymod.compress.exclude.action." + action
     */
    public static String getCompressionExcludeKey(String action) {
        return "minifymod.compress.exclude.action." + action;
    }


    /**
     * checks if the request calls an excluded action
     */
    public static boolean isExcludedAction(Request request) {
        return excludedActions.contains(getCompressionExcludeKey(request));
    }

    /**
     * checks if the action is an excluded action
     */
    public static boolean isExcludedAction(String action) {
        return excludedActions.contains(getCompressionExcludeKey(action));
    }


    /**
     * excludes these action
     */
    public static void excludeAction(String action) {
        if(!isExcludedAction(action)) {
            excludedActions.add(getCompressionExcludeKey(action));
        }
    }


    /**
     * Compresses HTML by removing whitespace
     */
    // Uses http://code.google.com/p/htmlcompressor/
    public static String compressHTML(final String input) {
        try {
            return htmlCompressor.compress(input);
        } catch (Exception ex) {
            Logger.error(ex, "HTML compression error: %s", ex.getMessage());
            return input;
        }
    }


    /**
     * Compresses XML by removing whitespace
     */
    // Uses http://code.google.com/p/htmlcompressor/
    public static String compressXML(final String input) {
        try {
            return xmlCompressor.compress(input);
        } catch (Exception ex) {
            Logger.error(ex, "XML compression error: %s", ex.getMessage());
            return input;
        }
    }


    /**
     * Compresses CSS by removing whitespace
     */
    // YUI compressor is used because it has no dependencies and is very
    // lightweight.
    public static String compressCSS(final String input) {
        try {
            return cssCompressor.compress(input);
        } catch (Exception ex) {
            Logger.error(ex, "CSS compression error: %s", ex.getMessage());
            return input;
        }
    }


    /**
     * Compresses JS by removing whitespace
     */
    // YUI compressor is used because it has no dependencies and is very
    // lightweight.
    public static String compressJS(final String input) {
        try {
            return jsCompressor.compress(input);
        } catch (Exception ex) {
            Logger.error(ex, "JS compression error: %s", ex.getMessage());
            return input;
        }
    }


    /**
     * @return Whether the request browser supports GZIP encoding
     */
    public static boolean isGzipSupported(final Http.Request request) {
        // key must be lower-case.
        final Http.Header encodingHeader = request.headers.get("accept-encoding");
        return (encodingHeader != null && encodingHeader.value().contains("gzip"));
    }


    /**
     * creates a gzipped ByteArrayOutputStream which can be used as response.out
     */
    public static ByteArrayOutputStream getGzipStream(final String input) throws IOException {
        final InputStream inputStream = new ByteArrayInputStream(input.getBytes());
        final ByteArrayOutputStream stringOutputStream = new ByteArrayOutputStream(input.length());
        final OutputStream gzipOutputStream = new GZIPOutputStream(stringOutputStream);
        final byte[] buf = new byte[5000];
        int len;
        while ((len = inputStream.read(buf)) > 0) {
            gzipOutputStream.write(buf, 0, len);
        }
        inputStream.close();
        gzipOutputStream.close();
        return stringOutputStream;
    }

}