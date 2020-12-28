
    
    const rootElement = document.getElementById('metu')

    if (!rootElement) {
        const params = new URLSearchParams(window.location.search)
        let root = document.createElement('div');
        root.id = 'metu';
        document.body.appendChild(root);
        const loadCss = file => {
            if (!file.startsWith('http')) {
                file = `https://menu.metu.vn/static/css/${file}`;
            }
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file;
            link.async = true;
            document.head.appendChild(link);
        }
        const loadJs = file => {
            if (!file.startsWith('http')) {
                file = `https://menu.metu.vn/static/js/${file}`;
            }
            let script = document.createElement('script');
            script.src = file;
            script.async = true;
            document.head.appendChild(script);
        }
        (['2.5cf3cbfd.chunk.css', 'main.f37137d4.chunk.css']).forEach(f => loadCss(f));
        (['2.fd56d826.chunk.js', 'main.fd498541.chunk.js', 'runtime~main.a8a9905a.js']).forEach(f => loadJs(f));
    }