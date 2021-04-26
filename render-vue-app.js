const fs = require('fs')
const path = require('path')
const { createdBundleRenderer } = require('vue-server-renderer')

let renderer 
let readyPromise
const resolve = file => path.resolve(__dirname, file)
const templatePath = resolve('./src/index.template.html')

const isProd = process.env.NODE_ENV === 'production'
const createRenderer = function () {
    return createdBundleRenderer(bundle, Object.assign(option, {
        runInNewContext: false 
    }))
}

async function render(req, res){
    res.setHeader('Context-Type', 'text/html')
    try{
        const html = renderer.renderToString({ url: req.url})
        res.send(html)
    } catch (err) {
        if (err.url){
            res.redirect(err.url)
        } else if (err.code === 404){
            res.status(404).send('404 | Page Not found')
        } else {
            res.status(500).send('500 | Internal Server Erro')
            console.log('error during renderer : ${req.url}')
            console.log(err.stack)
        }
    }
}

module.exports = (server) => {
    if(isProd){
        const template = fs.readFileSync(templatePath, 'utf-8')
        const bundle = require('./dist/vue-ssr-server-bundle.json')
        const clientManifest = require('./dist/vue-ssr-client-manifest.json')
        renderer = createRenderer(bundle, {
            template,
            clientManifest
        })
    } else {
        readyPromise = require('./build/setup-dev-server')(
            server,
            templatePath,
            (bundle, option) => {
                renderer = createRenderer(bundle, option)
            }
        )
    }

    if(isProd) return render
    return (req, res) => readyPromise.then(() => render(req, res))
}

/*
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
})

const createApp = require('./src/app')

module.exports = async (req, res) => {
    try{
        const context = {url : req.url}
        const app = createApp(context)
        const html = await renderer.renderToString(app)
        res.send(html)
    } catch(err){
        console.log(err)
        res.status(500).end(err.message)
    }
}

*/