package info.androidhive.listviewfeed;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;


import java.text.SimpleDateFormat;
import java.util.Calendar;

import info.androidhive.listviewfeed.app.AppController;
import info.androidhive.listviewfeed.data.BoardingItem;


public class BoardingPass extends Activity {
    private LayoutInflater inflater;
    private TextView terminal;
    private TextView luggage;
    private TextView time;
    private ImageView map;
    private TextView pname;
    private TextView fnumber;
    /*private TextView bgroup;*/
    private TextView bpos;
    private TextView from;
    private TextView to;

    private TextView textView2;
    private TextView textView3;
    private TextView textView4;
    private TextView textView5;
    private TextView textView6;
    private TextView textView7;
    private TextView textView8;
    private TextView textView9;


    BoardingItem item;
    private EditText bPass;
    private final String TAG1 = "bpass";
    private TextView nullM;

    private String URL_FEED = "http://54.183.0.115:3000/boarding";
    private static final String TAG = BoardingPass.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        View view = this.getWindow().getDecorView().findViewById(android.R.id.content);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_boarding_pass);
        terminal= (TextView)findViewById(R.id.terminal);
        luggage  = (TextView)findViewById(R.id.bgroup);
        time     = (TextView)findViewById(R.id.time);
        map      =(ImageView) findViewById(R.id.map);
        bPass = (EditText)findViewById(R.id.bPass);
        nullM =(TextView)findViewById(R.id.nullM);
        pname = (TextView)findViewById(R.id.pname);
        fnumber = (TextView)findViewById(R.id.fnumber);
        bpos = (TextView)findViewById(R.id.bpos);
        from = (TextView)findViewById(R.id.from);
        to = (TextView)findViewById(R.id.to);

        textView2 = (TextView)findViewById(R.id.textView2);
        textView3 = (TextView)findViewById(R.id.textView3);
        textView4 = (TextView)findViewById(R.id.textView4);
        textView5 = (TextView)findViewById(R.id.textView5);
        textView6 = (TextView)findViewById(R.id.textView6);
        textView7 = (TextView)findViewById(R.id.textView7);
        textView8 = (TextView)findViewById(R.id.textView8);
        textView9 = (TextView)findViewById(R.id.textView9);

        textView2.setText("");
        textView3.setText("");
        textView4.setText("");
        textView5.setText("");
        textView6.setText("");
        textView7.setText("");
        textView8.setText("");
        textView9.setText("");
    }

    public void showMap(View view){
        String s =bPass.getText().toString();
        Log.i(TAG1,s);
        String tempR = URL_FEED;
         tempR = tempR+"?id="+bPass.getText();

        item = new BoardingItem();
        JsonObjectRequest jsonReq = new JsonObjectRequest(Request.Method.GET,
                tempR, null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {
                VolleyLog.d(TAG, "Response: " + response.toString());
                if (response != null) {
                    parseJsonBFeed(response);
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
    }

    private void parseJsonBFeed(JSONObject response) {
        try {
            JSONArray feedArray = response.getJSONArray("feed");

                for (int i = 0; i < 1; i++) {
                    JSONObject feedObj = (JSONObject) feedArray.get(i);

                    if(feedObj.getString("gate").equals("not")) {
                        nullM.setText("Boarding Pass Not Found");
                        pname.setText("");
                        bpos.setText("");
                        from.setText("");
                        to.setText("");
                        fnumber.setText("");
                        terminal.setText("");
                        luggage.setText("");
                        time.setText("");
                        item.setMap("");
                        new DownloadImageTask((ImageView) findViewById(R.id.map)).execute(item.getMap());

                        textView2.setText("");
                        textView3.setText("");
                        textView4.setText("");
                        textView5.setText("");
                        textView6.setText("");
                        textView7.setText("");
                        textView8.setText("");
                        textView9.setText("");


                    }
                    else {
                        textView2.setText("Gate Number");
                        textView3.setText("Boarding Position");
                        textView4.setText("Time");
                        textView5.setText("Boarding Group");
                        textView6.setText("To");
                        textView7.setText("Passenger");
                        textView8.setText("Flight Number");
                        textView9.setText("From");
                        nullM.setText("");
                        item.setTime(feedObj.getString("boarding_time"));
                        item.setFlightL(feedObj.getString("gate"));

                        // Image might be null sometimes
                        String image = feedObj.isNull("image") ? null : feedObj
                                .getString("image");
                        item.setMap("http://54.183.0.115:3000/user.png");
                        item.setClaim(feedObj.getString("boarding_group"));
                        item.setFlightN(feedObj.getString("flight_no"));
                        item.setPname(feedObj.getString("fname")+" "+feedObj.getString("lname"));
                        item.setBposition(feedObj.getString("boarding_position"));
                        item.setFrom(feedObj.getString("from"));
                        item.setTo(feedObj.getString("to"));

                        pname.setText(item.getPname());
                        bpos.setText(item.getBposition());
                        from.setText(item.getFrom());
                        to.setText(item.getTo());
                        fnumber.setText(item.getFlightN());
                        terminal.setText(item.getFlightL());
                        luggage.setText(item.getClaim());
               /* Long lg = Long.parseLong(item.getTime());
                String timeAgo = getDate(lg);*/
                /*CharSequence timeAgo = DateUtils.getRelativeTimeSpanString(
                        Long.parseLong(item.getTime()),
                        System.currentTimeMillis(), DateUtils.SECOND_IN_MILLIS);*/
                        time.setText(item.getTime());
                        //time.setText(getDate(item.getTime()));

                        new DownloadImageTask((ImageView) findViewById(R.id.map)).execute(item.getMap());
                    }
                }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static String getDate(long milliSeconds)
    {
        // Create a DateFormatter object for displaying date in specified format.
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss.SSS");

        // Create a calendar object that will convert the date and time value in milliseconds to date.
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milliSeconds);
        return formatter.format(calendar.getTime());
    }


}
