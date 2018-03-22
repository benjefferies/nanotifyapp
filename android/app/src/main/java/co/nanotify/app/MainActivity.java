package co.nanotify.app;

import android.os.Bundle;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends ReactActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.e("MainActivity", "Subscribing to topic xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a");
        FirebaseMessaging.getInstance().subscribeToTopic("xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a");
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Nanotify";
    }
}
