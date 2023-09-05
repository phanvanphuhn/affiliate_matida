package com.growth.levers.matida;

import android.os.Bundle; 
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.zing.zalo.zalosdk.oauth.ZaloSDK;
import android.content.Intent;
import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import io.branch.rnbranch.*;

import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  ZaloSDK instance = ZaloSDK.Instance;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Matida";
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    instance.onActivityResult(this, requestCode, resultCode, data);
    super.onActivityResult(requestCode, resultCode, data);
  }
  
   // Override onStart:
   @Override
   protected void onStart() {
       super.onStart();
       RNBranchModule.initSession(getIntent().getData(), this);
   }
   
   // Override onNewIntent:
   @Override
   public void onNewIntent(Intent intent) {
       super.onNewIntent(intent);
      RNBranchModule.onNewIntent(intent);
   }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this); // <- initialize the splash screen
    super.onCreate(savedInstanceState); // or super.onCreate(null) with react-native-screens
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
