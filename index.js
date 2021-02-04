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
            renderMathInElement(q, {
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
            });
        }
    })
})