export default {
    props: {
        fileSizeUnit: {
            type: String,
            default: 'iec',
        },
    },
    methods: {
        isImage(name) {
            return name.match(/\.(?:png|jpe?g|gif|svg|webp)$/);
        },
        roundSize(x) {
            return Math.round(x * 100) / 100;
        },
        fileSize(size) {
            const unitSize = (this.fileSizeUnit === 'si' ? 1000 : 1024);

            const kib = this.roundSize(size / unitSize);

            if (kib < unitSize) {
                return kib + (this.fileSizeUnit === 'si' ? ' KB' : ' KiB');
            }

            const mib = this.roundSize(kib / unitSize);

            if (mib < unitSize) {
                return mib + (this.fileSizeUnit === 'si' ? ' MB' : ' MiB');
            }

            const gib = this.roundSize(mib / unitSize);

            if (gib < unitSize) {
                return gib + (this.fileSizeUnit === 'si' ? ' GB' : ' GiB');
            }

            const tib = this.roundSize(gib / unitSize);
            return tib + (this.fileSizeUnit === 'si' ? ' TB' : ' TiB');
        },
    },
};
