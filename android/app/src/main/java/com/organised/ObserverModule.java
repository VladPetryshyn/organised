package com.organised; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.os.FileObserver;

import javax.annotation.Nullable;

public class ObserverModule extends ReactContextBaseJavaModule {
    ObserverModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "ObserverModule";
    }

    FileObserver observer;
    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        getReactApplicationContext().getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class)).emit(eventName, params);
    }

    @ReactMethod
    public void startWatching(String location) {
        if (location != null) {
            observer = new FileObserver(location) { // set up a file observer to watch this directory on sd card

                @Override
                public void onEvent(int event, String file) {
                    if (event == FileObserver.CLOSE_WRITE && file != null && file.contains(".org")) {
                        WritableMap params = Arguments.createMap();
                        params.putString("name", file);
                        sendEvent("FileChanged", params);
                    }
                }
            };
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        observer.startWatching();
    }
    @ReactMethod
    public void removeListeners(Integer _) {
        if (observer != null) {
            observer.stopWatching();
        }
    }
}
