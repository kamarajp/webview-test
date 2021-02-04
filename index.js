const katexOptions = {
    delimiters: [
        { left: '$$', right: '$$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
    ],
    mathJaxDelimiters: [
        { left: '\\matrix{', right: '}', leftReplace: '\\begin{matrix}', rightReplace: '\\end{matrix}' },
        { left: '\\eqalign{', right: '}', leftReplace: '\\begin{aligned}', rightReplace: '\\end{aligned}' },
        { left: '^\\left(', right: '\\right)', leftReplace: '^{\\left(', rightReplace: '\\right)}' },
        { left: '^\\left[', right: '\\right]', leftReplace: '^{\\left[', rightReplace: '\\right]}' },
        { left: '^\\left\\{', right: '\\right\\}', leftReplace: '^{\\left\\{', rightReplace: '\\right\\}}' },
        { left: '\\text{', right: '}', leftReplace: '\\text{', rightReplace: '}', textRegex: [{ regex: /\$|\\\$/g, subst: '\\$' }], mathRegex: [{ regex: /\&|\\\&/g, subst: '\\&' }] }, // this must be last
    ]
};

const qdiv = document.querySelectorAll("div[data-src-type='question']");
Object.values(qdiv).map(q => {
    const qslug = q.getAttribute('data-src-id');
    const qUrl = `https://new-upgrade.toppr.com/api-ask/v1/questions/${qslug}/?format=json`;
    fetch(qUrl).then(res => res.json()).then(res => {
        if (res) {
            const { data = {} } = res;
            const questionData = data.question_data.haygot_question_info.question;
            const answersData = data.question_data.haygot_question_info.solution;
            q.innerHTML = `
                <span>${questionData}</span>
                <span>${answersData}</span>`;
            renderMathInElement(q, katexOptions);
        }
    })
})

const vdiv = document.querySelectorAll("div[data-src-type='video']");
Object.values(vdiv).map(q => {
    const vslug = q.getAttribute('data-src-id');
    const vUrl = `https://new-upgrade.toppr.com/api/v6/open/video/${vslug}/`;
    fetch(vUrl).then(res => res.json()).then(res => {
        if (res) {
            const { data = {} } = res;
            const videoTitle = data.content.title;
            const videoDuration = data.content.duration;
            const videoUrl = data.content.languages[0].youtube_url;
            const videoThumbnail = data.content.thumbnails['640'];
            q.innerHTML = `
                <a href=${videoUrl} target='_blank'>
                <h2>${videoTitle}</h2>
                <h3>${videoDuration}</h3>
                <img src='${videoThumbnail}'/>
                </a>`;
            // renderMathInElement(q, katexOptions);
        }
    })
})

const sdiv = document.querySelectorAll("div[data-src-type='story']");
Object.values(sdiv).map(q => {
    const sslug = q.getAttribute('data-src-id');
    const sUrl = `https://new-upgrade.toppr.com/api/v6/open/story/${sslug}/`;
    fetch(sUrl).then(res => res.json()).then(res => {
        if (res) {
            const { data = {} } = res;
            const storyTitle = data.content.title;
            const storyTime = data.content.read_time;
            const storyThumbnail = data.content.thumbnail_url.webp["350"];
            q.innerHTML = `
                <h2>${storyTitle}</h2>
                <h3>${storyTime}</h3>
                <img src='${storyThumbnail}'/>
                `;
            // renderMathInElement(q, katexOptions);
        }
    })
})