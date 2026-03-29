/** @type {import('next').NextAdapter} */
const adapter = {
    name: 'app-adapter',
    async onBuildComplete({outputs, buildId}) {
        console.log('### BUILD COMPLETE', buildId)
        
    }
}

module.exports = adapter