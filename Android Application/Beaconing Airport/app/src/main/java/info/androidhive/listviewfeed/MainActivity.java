package info.androidhive.listviewfeed;

import info.androidhive.listviewfeed.adapter.FeedListAdapter;
import info.androidhive.listviewfeed.app.AppController;
import info.androidhive.listviewfeed.data.FeedItem;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.view.accessibility.AccessibilityNodeInfoCompat;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.NotificationCompat;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.View;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toolbar;

import com.android.volley.Cache;
import com.android.volley.Cache.Entry;
import com.android.volley.Request.Method;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;

import android.bluetooth.BluetoothManager;
import com.gimbal.android.CommunicationManager;
import com.gimbal.android.Gimbal;
import com.gimbal.android.PlaceEventListener;
import com.gimbal.android.PlaceManager;
import com.gimbal.android.Visit;

public class MainActivity extends Activity {

	private PlaceManager placeManager;
	private PlaceEventListener placeEventListener;

	private static final String TAG = MainActivity.class.getSimpleName();
	private ListView listView;
	private TextView hello;
	private FeedListAdapter listAdapter;
	private List<FeedItem> feedItems;
	private String URL_FEED = "http://54.183.0.115:3000/alert/all";

	NotificationCompat.Builder notification;
	public static final int ID = 2709;

	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {



		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		notification = new NotificationCompat.Builder(this);
		notification.setAutoCancel(true);

		listView = (ListView) findViewById(R.id.list);
		hello = (TextView) findViewById(R.id.hello);
		feedItems = new ArrayList<FeedItem>();

		listAdapter = new FeedListAdapter(this, feedItems);
		listView.setAdapter(listAdapter);
		
		// These two lines not needed,
		// just to get the look of facebook (changing background color & hiding the icon)
		getActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#000000")));
		getActionBar().setIcon(
				   new ColorDrawable(getResources().getColor(android.R.color.transparent)));

		Gimbal.setApiKey(this.getApplication(), "941b5ba8-a345-49fd-a85e-3a46db5c8d5f");

		//setBeacon();
		placeEventListener = new PlaceEventListener() {
			@Override
			public void onVisitStart(Visit visit) {
				super.onVisitStart(visit);
				/*listAdapter.add(String.format("Start Visit for %s", visit.getPlace().getName()));
				listAdapter.notifyDataSetChanged();*/
				// We first check for cached request
				hello.setText("welcome to " + visit.getPlace().getName());

				// making fresh volley request and getting json
				String name= visit.getPlace().getName();
				String tempU;
				tempU=URL_FEED+"/?beacon="+name.charAt(9);

				JsonObjectRequest jsonReq = new JsonObjectRequest(Method.GET,
						tempU, null, new Response.Listener<JSONObject>() {

							@Override
							public void onResponse(JSONObject response) {
								VolleyLog.d(TAG, "Response: " + response.toString());
								if (response != null) {
									parseJsonFeed(response);
								}
							}
						}, new Response.ErrorListener() {

							@Override
							public void onErrorResponse(VolleyError error) {
								VolleyLog.d(TAG, "Error: " + error.getMessage());
							}
						});

						// Adding request to volley request queue
						AppController.getInstance().addToRequestQueue(jsonReq);
						String s = visit.getPlace().getName();
					noTify(s);
				}

			@Override
			public void onVisitEnd(Visit visit) {
				super.onVisitEnd(visit);
				hello.setText("Not in terminal area");
				feedItems.clear();
				listAdapter.notifyDataSetChanged();
			}
		};
		placeManager = PlaceManager.getInstance();
		placeManager.addListener(placeEventListener);
		placeManager.startMonitoring();
		CommunicationManager.getInstance().startReceivingCommunications();
	}

	/**
	 * Parsing json reponse and passing the data to feed view list adapter
	 * */
	private void parseJsonFeed(JSONObject response) {
		try {
			JSONArray feedArray = response.getJSONArray("data");

			for (int i = 0; i < feedArray.length(); i++) {
				JSONObject feedObj = (JSONObject) feedArray.get(i);
				int q;
				q = i+i;
				FeedItem item = new FeedItem();
				item.setId(q);
				if(feedObj.getString("beacon").equals("1")) {
					item.setName("Terminal 1");
				}
				else if(feedObj.getString("beacon").equals("2")) {
					item.setName("Terminal 2");
				}
				else if(feedObj.getString("beacon").equals("3")){
					item.setName("Terminal 3");
				}
				else if(feedObj.getString("beacon").equals("4")){
					item.setName("Terminal 4");
				}
				else if(feedObj.getString("beacon").equals("5")){
					item.setName("Terminal 5");
				}
				else if(feedObj.getString("beacon").equals("6")){
					item.setName("Terminal 6");
				}


				// Image might be null sometimes
				String image = feedObj.isNull("image") ? null : feedObj
						.getString("image");
				item.setImge("http://54.183.0.115:3000"+image);
				item.setStatus(feedObj.getString("status"));
				//item.setProfilePic(feedObj.getString("profilePic"));
				item.setTimeStamp(feedObj.getString("createdAt"));

				// url might be null sometimes
				String feedUrl = feedObj.isNull("isActive") ? null : feedObj
						.getString("isActive");
				if(feedUrl.equals("true")){
					item.setUrl("Problem Still persists");
				}
				else
				{
					item.setUrl("Situation handled");
				}


				feedItems.add(item);
			}

			// notify data changes to list adapater
			listAdapter.notifyDataSetChanged();
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	public void bPass(View view){
		Intent intent = new Intent(this, BoardingPass.class);
		startActivity(intent);
	}

	public void noTify(String s){
		notification.setSmallIcon(R.drawable.ic_launcher);
		notification.setTicker("Entered Terminal");
		notification.setWhen(System.currentTimeMillis());
		notification.setContentTitle("Entered Terminal");
		notification.setContentText("Welcome to Terminal "+s);
		Intent intent = new Intent(this,MainActivity.class);
		PendingIntent pi = PendingIntent.getActivity(this,0,intent,PendingIntent.FLAG_UPDATE_CURRENT);
		notification.setContentIntent(pi);
		NotificationManager nm = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
		nm.notify(ID,notification.build());

	}

	public void setBeacon(){
		placeEventListener = new PlaceEventListener() {
			@Override
			public void onVisitStart(Visit visit) {
				super.onVisitStart(visit);
				/*listAdapter.add(String.format("Start Visit for %s", visit.getPlace().getName()));
				listAdapter.notifyDataSetChanged();*/
				// We first check for cached request
				hello.setText("welcome to " + visit.getPlace().getName());
				String name= visit.getPlace().getName();
				String tempU;
				tempU=URL_FEED+"/?beacon"+name.charAt(9);

				// making fresh volley request and getting json

				JsonObjectRequest jsonReq = new JsonObjectRequest(Method.GET,
						tempU, null, new Response.Listener<JSONObject>() {

					@Override
					public void onResponse(JSONObject response) {
						VolleyLog.d(TAG, "Response: " + response.toString());
						if (response != null) {
							parseJsonFeed(response);
						}
					}
				}, new Response.ErrorListener() {

					@Override
					public void onErrorResponse(VolleyError error) {
						VolleyLog.d(TAG, "Error: " + error.getMessage());
					}
				});

				// Adding request to volley request queue
				AppController.getInstance().addToRequestQueue(jsonReq);
				String s = visit.getPlace().getName();
				noTify(s);
			}

			@Override
			public void onVisitEnd(Visit visit) {
				super.onVisitEnd(visit);
				hello.setText("Not in terminal area");
				feedItems.clear();
				listAdapter.notifyDataSetChanged();
			}
		};
	}
}
