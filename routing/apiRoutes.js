
var friendsData = require("../app/data/friends");


module.exports = function(app) {

    // API GET Requests
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });
  
    // API POST Requests
    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            img: "",
            score: 0
        };

        var newFriend = req.body;
        var scores = newFriend.scores;
        var scoreDiff = 0;

        for (var i = 0; i < friendsData.length; i ++) {

            scoreDiff = 0;
            var friendScore = friendsData[i].scores;

            for (var j = 0; j < friendScore.length; j++) {
                
                scoreDiff = scoreDiff + (Math.abs(parseInt(friendScore[j]) - parseInt(scores[j])));
            }

            if (i == 0) {

                bestMatch.name = friendsData[i].name;
                bestMatch.img = friendsData[i].img;
                bestMatch.score = scoreDiff;
            }

            else if (bestMatch.score < scoreDiff) {

                bestMatch.name = friendsData[i].name;
                bestMatch.img = friendsData[i].img;
                bestMatch.score = scoreDiff;
            }
        }

        friendsData.push(newFriend);
		res.json(bestMatch);
    });
};
  