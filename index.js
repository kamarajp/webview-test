const url = 'https://new-upgrade.toppr.com/api-ask/v1/questions/what-is-the-best-way-to-test-the-relatedness-of-two-species/?format=json';
(function(){
    fetch(url, {mode: 'no-cors'}).then(res => console.log(res))
})();