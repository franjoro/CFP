$(document).ready(function(){
// hide elements
    $("#blockTest").css("display", "none");
    $("#btn1").click(()=>{
        click1();
    });
    $("#btn2").click(()=>{
        click2();
    });
    $("#btn3").click(()=>{
        click3();
    });
    $("#btn4").click(()=>{
        click4();

    });

});

const click1 = ()=>{
    $("#btn1").removeClass('btn-primary').addClass('btn-info');
    $("#btn2").removeClass('btn-info').addClass('btn-primary');
    $("#btn3").removeClass('btn-info').addClass('btn-primary');
    $("#btn4").removeClass('btn-info').addClass('btn-primary');
    $("#blockTest").css("display", "none");
    $("#blockInterview").css("display", "block");
};
const click2 = ()=>{
    $("#btn1").removeClass('btn-info').addClass('btn-primary');
    $("#btn2").removeClass('btn-primary').addClass('btn-info');
    $("#btn3").removeClass('btn-info').addClass('btn-primary');
    $("#btn4").removeClass('btn-info').addClass('btn-primary');
    $("#blockTest").css("display", "block");
    $("#blockInterview").css("display", "none");
};
const click3 = ()=>{
    $("#btn1").removeClass('btn-info').addClass('btn-primary');
    $("#btn2").removeClass('btn-info').addClass('btn-primary');
    $("#btn3").removeClass('btn-primary').addClass('btn-info');
    $("#btn4").removeClass('btn-info').addClass('btn-primary');
    $("#blockTest").css("display", "none");
    $("#blockInterview").css("display", "block");
};
const click4 = ()=>{
    $("#btn1").removeClass('btn-info').addClass('btn-primary');
    $("#btn2").removeClass('btn-info').addClass('btn-primary');
    $("#btn3").removeClass('btn-info').addClass('btn-primary');
    $("#btn4").removeClass('btn-primary').addClass('btn-info');
    $("#blockTest").css("display", "none");
    $("#blockInterview").css("display", "block");
};
