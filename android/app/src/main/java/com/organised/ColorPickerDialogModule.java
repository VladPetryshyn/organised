package com.organised;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;



public class ColorPickerDialogModule extends ReactContextBaseJavaModule {
    ColorPickerDialogModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "ColorPickerDialog";
    }

    @ReactMethod
    public void openDrawer(Callback callback) {
//        new ColorPickerDialog.Builder(this)
//                .setTitle("ColorPicker Dialog")
//                .setPreferenceName("MyColorPickerDialog")
//                .setPositiveButton(getString(R.string.confirm),
//                        new ColorEnvelopeListener() {
//                            @Override
//                            public void onColorSelected(ColorEnvelope envelope, boolean fromUser) {
//                                callback(envelope);
//                            }
//                        })
//                .setNegativeButton(getString(R.string.cancel),
//                        new DialogInterface.OnClickListener() {
//                            @Override
//                            public void onClick(DialogInterface dialogInterface, int i) {
//                                dialogInterface.dismiss();
//                            }
//                        })
//                .attachAlphaSlideBar(true) // the default value is true.
//                .attachBrightnessSlideBar(true)  // the default value is true.
//                .setBottomSpace(12) // set a bottom space between the last slidebar and buttons.
//                .show();
    }
}
