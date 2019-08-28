let uidep = 0;
class Dep {
    constructor () {
        this.id = uidep++;
        this.subs = []; //watchers
    }

    addSub (Watcher) {
        this.subs.push(Watcher);
    }

    depend () {
        if(Dep.target) {
            Dep.targe.addDep(this);
        }
    }

    notify () {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i<l ; i++){
            subs[i].update();
        }
    }
}

Dep.target = null;
const targetStack = [];

function pushTarget(Watcher) {
    if(Dep.target) targetStack.push(Dep.target);
    Dep.target = Watcher;
}
