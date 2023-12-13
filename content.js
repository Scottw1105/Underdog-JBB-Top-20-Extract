function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function exportToCSV(filename, csvData) {
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvBlob);
  
    const a = document.createElement("a");
    a.href = csvURL;
    a.download = filename;
  
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(csvURL);
  } 

async function findDivs() {
    const divs = Array.from(document.querySelectorAll(".styles__draftPoolContent__OvOLG"));

    const top_20 =[['username', 'place', 'winnings', 'points',
    'tournament name', 'entry fee', 'sport', 'entrants', 'fill%', 'slate', 'max entries', 'draft size', 'draft rounds', 'rake', 'start time']]

    if (divs.length > 0 ) {
        for (let index = 0; index < divs.length; index ++) {
            const divs = Array.from(document.querySelectorAll(".styles__draftPoolContent__OvOLG"));
            const div = divs[index];
            await sleep(1000);
            div.click();
            console.log(`Clicked div ${index}`);

            tourney_info = []

            // Gather tournament information
            await sleep(1000);
            document.querySelector(".styles__infoIcon__i2XtS").click();
            await sleep(1000);
            var tourney_info = [];

            var tourney_name = document.querySelector(".styles__title__ZrO6C").textContent.trim();
            tourney_info.push(tourney_name);
            
            var entry_value = document.querySelector(".styles__entryInfoValue__qx_JF").textContent.trim();
            tourney_info.push(entry_value);
            
            var raw_tourney_info = document.querySelectorAll(".styles__infoValue__F0R73")

            var sport = raw_tourney_info[0].textContent.trim();
            tourney_info.push(sport);
            var entrants = raw_tourney_info[1].textContent.trim().replace(',','');
            tourney_info.push(entrants);
            var fill = raw_tourney_info[2].textContent.trim();
            tourney_info.push(fill);
            var slate = raw_tourney_info[3].textContent.trim();
            tourney_info.push(slate);
            var max_entries = raw_tourney_info[5].textContent.trim();
            tourney_info.push(max_entries);
            var draft_size = raw_tourney_info[6].textContent.trim();
            tourney_info.push(draft_size);
            var draft_rounds = raw_tourney_info[7].textContent.trim();
            tourney_info.push(draft_rounds);
            var rake = raw_tourney_info[8].textContent.trim();
            tourney_info.push(rake);
            var start_time = raw_tourney_info[9].textContent.trim();
            tourney_info.push(start_time);

            document.querySelector(".styles__closeButton__ZYuEF").click();
            await sleep(1000);

            // Gather individual lineup information
            var lineups = Array.from(document.querySelectorAll(".styles__leaderboardListCell__UgwtJ"));

            if (lineups.length > 0) {
                for (let LineupIndex = 0; LineupIndex < lineups.length; LineupIndex++) {
                    var lineup_temp =[]
                    var lineup_info = lineups[LineupIndex];
                    var username = lineup_info.querySelector('.styles__username__b9iOr').textContent.trim();
                    
                    var placeElement = lineup_info.querySelector('.styles__medalWrapper__YIQtl').textContent.trim();

                    var place;
                    if (placeElement !== "") {
                    // If the element exists, get its text content
                    place = placeElement;
                    } else {
                    // If the element is null, use the alternative value (e.g., 'index')
                    place = String(LineupIndex + 1);  // Replace 'index' with the appropriate value
                    };
                    
                    var winnings = lineup_info.querySelector('.styles__winningsTextWrapper___883W').textContent.trim().replace(',','');
                    
                    var points = lineup_info.querySelector('.styles__infoValue__PIUC6').textContent.trim();
                    
                    lineup_temp.push(username, place, winnings, points);
                    var lineup_temp = lineup_temp.concat(tourney_info);

                    top_20.push(lineup_temp); 
                    
                };
            }
            document.querySelector(".styles__backRow__anE4_").click();
            await sleep(1000);
        
    }
    console.log(top_20);
    exportToCSV("Results", top_20.join("\n"));
}

}
findDivs();