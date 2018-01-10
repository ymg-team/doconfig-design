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
        // added class active
        this.alert_el.classList.add('active')
        // set child content
        this.alert_el.innerHTML = `<div onClick="dc.alert.close()" class='alert-item alert-${type}'>${message}</div>`
        setTimeout(() => {
            this.close()
        }, 4000)
    }

    close()
    {
        // remove class active
        this.alert_el.classList.remove('active')
        // remove all child conten
        this.alert_el.innerHTML = ''
    }
}

window.dc = {
    alert: new DcAlert()
}
