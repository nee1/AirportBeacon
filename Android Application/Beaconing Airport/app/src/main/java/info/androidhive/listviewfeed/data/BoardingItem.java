package info.androidhive.listviewfeed.data;

/**
 * Created by shali on 5/2/2016.
 */
public class BoardingItem {

    private String flightL, claim, time, map,flightN,pname,bposition,from,to;

    public BoardingItem() {
    }

    public BoardingItem(String flight,String claim,String time,String map){
        this.flightL = flight;
        this.claim = claim;
        this.time = time;
        this.map = map;
    }

    public String getFlightN() {
        return flightN;
    }

    public String getFrom() {
        return from;
    }

    public String getPname() {
        return pname;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setFlightN(String flightN) {
        this.flightN = flightN;
    }

    public String getBposition() {
        return bposition;
    }

    public void setBposition(String bposition) {
        this.bposition = bposition;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getMap() {
        return map;
    }

    public void setMap(String map) {
        this.map = map;
    }

    public String getFlightL() {
        return flightL;
    }

    public void setFlightL(String flight) {
        this.flightL = flight;
    }

    public String getClaim() {
        return claim;
    }

    public void setClaim(String claim) {
        this.claim = claim;
    }
}
