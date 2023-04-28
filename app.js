let actualPageIndex;

getNextPage();

function getNextPage(){

    if(actualPageIndex === undefined) {
        actualPageIndex = 0;
    } else {
        actualPageIndex++;
    };
    PokeService.getPage(actualPageIndex).then(page => {
        console.log(page);
    });

};

function getPreviousPage(){

    actualPageIndex--;
    PokeService.getPage(actualPageIndex).then(page => {
        console.log(page);
    });

};