console.log('app is ready')

// dc alert
class DcAlert
{
    constructor()
    {
        this.alert_el = document.getElementById('alert')
    }

    open(type='info', message='tidak ada apa-apa...')
    {
        this.close()
        this.alert_el.innerHTML = `<div class='alert-item alert-${type}'>${message}</div>`
    }

    close()
    {
        this.alert_el.innerHTML = ''
    }
}

window.dc = {
    alert: new DcAlert()
}
