/**
 * Created by 213 on 2016/11/9.
 */


function changeJoinPlan() {
    var joinPlanRadioList = document.getElementsByName("joinPlan");
    for (var i = 0; i < joinPlanRadioList.length; i++) {
        if (joinPlanRadioList[i].checked) {
            if (joinPlanRadioList[i].value == '2') {
                document.getElementById( "joinActivityList").style.display= "none";
                document.getElementById( "joinActivityType").style.display= "none";
                document.getElementById( "resourcesCodeInfo").style.display= "none";
                document.getElementById( "resourcesCodeList").style.display= "none";
            }else{
                document.getElementById( "joinActivityList").style.display= "inline";
                document.getElementById( "joinActivityType").style.display= "inline";
                document.getElementById( "resourcesCodeInfo").style.display= "inline";
                document.getElementById( "resourcesCodeList").style.display= "inline";
            }
        }
    }
}