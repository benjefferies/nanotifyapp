package co.nanotify.app;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class FBMessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(final RemoteMessage remoteMessage) {
        Handler h = new Handler(Looper.getMainLooper());
        h.post(new Runnable() {
            @Override
            public void run() {
                Context context = getApplicationContext();
                Toast.makeText(context, remoteMessage.getNotification().getBody(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
