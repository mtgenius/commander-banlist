var API = 'https://api.mtgeni.us';
var TABLE_WIDTH = 640;

var error = document.getElementById('error');
var loading = document.getElementById('loading');
loading.getElementsByTagName('strong').item(0).appendChild(document.createTextNode('Loading'));

if (typeof window.fetch !== 'function') {
  loading.style.setProperty('display', 'none');
  error.appendChild(document.createTextNode('Your browser does not support the fetch API.'));
  error.style.setProperty('display', 'block');
}

else {
  window.fetch(API + '/commander-banlist')
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var banlists = response;
      var BANLISTS_LENGTH = banlists.length;
      var banlist = banlists.reduce(
        function(accumulator, current, banlistIndex) {
          var CARDS_LENGTH = current.cards.length;
          for (var c = 0; c < CARDS_LENGTH; c++) {
            var cardIndex = accumulator.findIndex(function(card) {
              return card[0] === current.cards[c];
            });
            if (cardIndex === -1) {
              accumulator.push([
                current.cards[c],
                banlistIndex
              ]);
            }
            else {
              accumulator[cardIndex].push(banlistIndex);
            }
          }
          return accumulator;
        },
        []
      );
      var BANLIST_LENGTH = banlist.length;
      banlist.sort(function(a, b) {
        if (a[0] < b[0]) {
          return -1;
        }
        return 1;
      });
      var previousTableCount = 0;
      var success = document.getElementById('success');
      var renderBanlists = function() {
        var BODY_WIDTH = document.body.getBoundingClientRect().width;
        var TABLE_COUNT = Math.floor(BODY_WIDTH / TABLE_WIDTH);
        console.log(TABLE_COUNT);
        if (TABLE_COUNT !== previousTableCount) {
          while (success.firstChild) {
            success.removeChild(success.firstChild);
          }
          var CARDS_PER_TABLE = Math.ceil(BANLIST_LENGTH / TABLE_COUNT);
          for (var t = 0; t < TABLE_COUNT; t++) {
            var table = document.createElement('table');
            var thead = document.createElement('thead');
            var theadTr = document.createElement('tr');
            theadTr.appendChild(document.createElement('td'));
            for (var b = 0; b < BANLISTS_LENGTH; b++) {
              var th = document.createElement('th');
              var abbr = document.createElement('abbr');
              abbr.setAttribute('title', banlists[b].long);
              abbr.appendChild(document.createTextNode(banlists[b].short));
              th.appendChild(abbr);
              theadTr.appendChild(th);
            }
            thead.appendChild(theadTr);
            table.appendChild(thead);
            var tbody = document.createElement('tbody');
            var LAST_CARD_INDEX = Math.min(BANLIST_LENGTH, (t + 1) * CARDS_PER_TABLE);
            for (var c = t * CARDS_PER_TABLE; c < LAST_CARD_INDEX; c++) {
              var tr = document.createElement('tr');
              var th = document.createElement('th');
              th.appendChild(document.createTextNode(banlist[c][0]));
              tr.appendChild(th);
              for (var b = 0; b < BANLISTS_LENGTH; b++) {
                var td = document.createElement('td');
                var banned = banlist[c].findIndex(function(list, index) {
                  if (index === 0) {
                    return false;
                  }
                  return list === b;
                }) !== -1;
                td.className = banned ? 'banned' : 'unbanned';
                td.setAttribute('title',
                  banned ?
                    'Banned by ' + banlists[b].long :
                    'Allowed by ' + banlists[b].long
                );
                td.appendChild(document.createTextNode(
                  banned ?
                    '\u2718' :
                    '\u2713'
                ));
                tr.appendChild(td);
              }
              tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            success.appendChild(table);
          }
        }
      };
      loading.style.setProperty('display', 'none');
      window.addEventListener('resize', renderBanlists);
      renderBanlists();
    })
    .catch(function(err) {
      loading.style.setProperty('display', 'none');
      error.appendChild(document.createTextNode(err.message));
      error.style.setProperty('display', 'block');
    });
}
