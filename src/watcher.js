let uid = 0;
class Watcher {
    constructor(vm, expOrFn, cb, options) {
        this.vm = vm;
        //规范输入值为boolean
        if(options) {
            this.deep = !!options.deep;
            this.user = !!options.user
	        this.lazy = !!options.lazy
        }else{
	    	this.deep = this.user = this.lazy = false
        }

        this.dirty = this.lazy
        
        this.cb = cb
		this.id = ++uid
        this.deps = []
        this.newDeps = []
	    this.depIds = new Set()
        this.newDepIds = new Set()
        if (typeof expOrFn === 'function') {
			//data依赖收集走此处
	      	this.getter = expOrFn
	    } else {
	    	//watch依赖走此处
	      	this.getter = this.parsePath(expOrFn)
	    }
		//设置Dep.target的值，依赖收集时的watcher对象
		this.value = this.lazy ? undefined : this.get()

    }
    get(){
		//设置Dep.target值，用以依赖收集
	    pushTarget(this)
	    const vm = this.vm
	    //此处会进行依赖收集 会调用data数据的 get
	    let value = this.getter.call(vm, vm)
	    popTarget()
	    return value
    }
    
}