  function getRandom(minNum, maxNum) {  //取得 minNum(最小值) ~ maxNum(最大值) 之間的亂數
    return Math.floor( Math.random() * (maxNum - minNum + 1) ) + minNum;
  }

  function getRandomArray(minNum, maxNum, n) 
      {  //隨機產生不重覆的n個數字
        var rdmArray = [n];   //儲存產生的陣列
       
        for(var i=0; i<n; i++) {
          var rdm = 0;    //暫存的亂數
       
          do {
            var exist = false;      //此亂數是否已存在
            rdm = getRandom(minNum, maxNum);  //取得亂數
       
            //檢查亂數是否存在於陣列中，若存在則繼續回圈
            if(rdmArray.indexOf(rdm) != -1) exist = true;
       
          } while (exist);  //產生沒出現過的亂數時離開迴圈
       
          rdmArray[i] = rdm;
        }
        return rdmArray;
      };

  $(document).ready(function(){

      $("#Exam").hide();//隱藏題庫

      var no = 0;
      var clickFlag = 0;
      var score = 0;
      var questionArray = $("p");
      var answerArray = new Array;
      for (var i = 0; i < questionArray.length; i++) {
        var temp = $(questionArray[i]).text();
        answerArray.push(temp.substring(temp.indexOf("【")+1,temp.indexOf("】")));
      }

      var randonArray = getRandomArray(0,answerArray.length,50);

      var answerElement = answerArray[randonArray[0]];
      var questionElement = questionArray[randonArray[0]];

      $("span[style='color: red']").css("display","none");//清空答案
      $("p>span span:nth-child(2)").before("<br/>");//換行
      $("#numberOfQuertion").html("No.1");
      $("#questionDiv").html($(questionElement).html());

      $("#nextBtn").click(function(){
        if(no >= 49){
          $("#numberOfQuertion").html("答題結束！<br/>你的分數是<span style='color:red;'>"+score+"</span>分!");

          $(".w3-btn").css("display","none");
          $("#questionDiv").html("");
          $("#anwersDiv").html("");
        }else{
          no++;
          clickFlag = 0;
          $(".awsOption").css("background-color","");
          $("#anwersDiv").html("");
          $($"#nextBtn").css("background-color","");
         
          answerElement = answerArray[randonArray[no]];
          questionElement = questionArray[randonArray[no]];
          $("#numberOfQuertion").html("No."+(no+1));
          $("#questionDiv").html($(questionElement).html());
        }
      });

      $(".awsOption").click(function(){
        var optionElement = $(this);
        var answer = optionElement.html();
        if(answerElement === answer){
            $(optionElement).css("background-color","#01B468");
            if(clickFlag == 0)
              score += 2;
        }else{
            $(optionElement).css("background-color","#FF5151");
            $("#anwersDiv").html("答案是：<span style='color:red;'>"+answerElement+"</span> 啦 ! 吼！");
        }
        
        clickFlag++;
        console.log("score = "+score);
      });
      
  });