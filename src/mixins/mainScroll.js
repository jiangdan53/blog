export default function (refValue) {
    return {
        data() {
            return {
                target: 0,
                ismenutext: false,
                curTarget: 0,
                index:0,
                tset:0,
                isjl:true ,
            }
        },
        mounted() {
            this.$bus.$on('setMainscroll', this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
        },
        beforeDestroy() {
            this.$bus.$emit('mainScroll');
            this.$bus.$off('setMainscroll', this.handleSetMainScroll);
            this.$refs[refValue].removeEventListener('scroll', this.handleMainScroll)
        },
        methods: {
            handleSetMainScroll(scrollTop, every = 0) {
                this.isjl = false
                let that = this;
                requestAnimationFrame(() => {
                    if (that.index === 120) {
                        that.$refs[refValue].scrollTop = that.target 
                        that.curTarget = that.$refs[refValue].scrollTop;
                        that.index = 0
                        this.isjl = true;
                        return
                    }
                     every = every !== 0 ? every : scrollTop / 120;
                    that.target += every
                    that.$refs[refValue].scrollTop = that.target
                    that.handleSetMainScroll(scrollTop, every );
                    that.index ++

                })

            },

            handleMainScroll(e) {
                //记录.当前位置
                if(this.isjl){
                    this.target = this.$refs[refValue].scrollTop
                }
                this.$bus.$emit('mainScroll', this.$refs[refValue]);
            },
        }
    }
}