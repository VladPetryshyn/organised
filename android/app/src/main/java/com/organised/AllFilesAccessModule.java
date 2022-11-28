package com.organised; // replace com.your-app-name with your app’s name
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;

import androidx.activity.result.contract.ActivityResultContracts;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class AllFilesAccessModule extends ReactContextBaseJavaModule {
    AllFilesAccessModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "AllFilesAccessModule";
    }

    @ReactMethod
    public void openAllFilesPermission() {
        if(Build.VERSION.SDK_INT >= 30){
            if(!Environment.isExternalStorageManager()){
                Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, Uri.parse("package:" + BuildConfig.APPLICATION_ID));
                Activity activity = getReactApplicationContext().getCurrentActivity();
                activity.startActivityForResult(intent, 501);
            }
        }
    }
}
