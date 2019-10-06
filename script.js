
$( document ).ready(function() {

    $("#search-box").keyup(function(event){
        var x = event.keyCode;
        if(x == 13){
            $(".search").css("top","25%");
            $(".search").css("transform","translate(-50%, 0%)");
            setTimeout(function(){
                $(".results-based-on-search").css("display", "block");
            }, 800);
        }
        var value = $('#search-box').val();
            var repositoryURL = 'https://api.github.com/users/'+value+'/repos';

            $.ajax({
                type: 'GET',
                url: repositoryURL,
                success: function(data) {
                    createCard(data);
                },
            });


        if ( value.length > 0) {
            $("button").removeClass("disable");
            $("button").addClass("working");
            $('#clearSearchButton').css('display', 'block'); 
            $(".search__button").click(function(){
                $(".search").css("top","25%");
                $(".search").css("transform","translate(-50%, 0%)");
                setTimeout(function(){
                    $(".results-based-on-search").css("display", "block");
                }, 800);
            });
        }else{
            $("button").addClass("disable");
            $("button").removeClass("working");
            $('#clearSearchButton').css('display', 'none');
        }

    });


    $("#clearSearchButton img").click(function(){
        var searchbox  =  $("#search-box");
        searchbox.val("");
        $("#clearSearchButton").css("display", "none");
        setTimeout(function(){
            $(".results-based-on-search").css("display", "none");
            $(".search").css("top","50%");
            $(".search").css("transform","translate(-50%, -50%)");
        }, 300);
    });

    var cardtext = "";
    
    function createCard(data){
        cardtext = '';
        for(key in data){
                cardtext += `<div class="fold-oneBytwo--card fold-oneBytwo--card-one">
                                <a href="${data[key].svn_url}" target="_blank">
                                    <div class="fold-card--details">
                                        <div class="fold-card--details-header">${data[key].name}</div>`;
                                        if(data[key].description == null){
                                            cardtext += `<div class="fold-card--details-text">No Description Mentioned</div>`;
                                        }else{
                                            cardtext += `<div class="fold-card--details-text">${data[key].description}</div>`;
                                        }
                                        cardtext += `<div class="fold-card--details-support-text">Last Updated: <span class="fold-card--details-support-text">${localTime(data[key].updated_at)}</span></div>
                                    </div>
                                </a>
                            </div>`;
        }
        $(".fold-oneBytwo-container").html(cardtext);
    }

    function localTime(dteTime){
        var date1 = new Date(dteTime);
        return date1;
    }
});