<script module lang="ts">
    import { writable, type Writable } from "svelte/store";

    export interface DrawStore {
        color: string;
        thickness: number;
        restore: ImageData[];
        restoreIndex: number;
        latestColors: string[];
        undo: () => void;
        redo: () => void;
    }

    export function createDrawStore() {
        return writable<DrawStore>({
            color: "#000000",
            thickness: 2,
            restore: [],
            restoreIndex: -1,
            latestColors: [],
            undo: () => {},
            redo: () => {},
        });
    }

    function handleLatestColors(latestColors: string[], color: string) {
        const latestColors_ = new Set(latestColors);

        latestColors_.delete(color);
        latestColors_.add(color);

        if (latestColors_.size > 10) {
            const [_, ...rest] = latestColors_;
            return rest;
        }

        return [...latestColors_];
    }
</script>

<script lang="ts">
    import { onMount, tick } from "svelte";

    let { store }: { store?: Writable<DrawStore> } = $props();

    if (!store) {
        store = createDrawStore();
    }

    let canvas!: HTMLCanvasElement;
    let renderContext!: CanvasRenderingContext2D;

    let is_drawing = false;
    let latestColor!: string;

    function saveState() {
        $store!.restoreIndex++;
        $store!.restore[$store!.restoreIndex] = renderContext.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
        );
        $store!.restore = $store!.restore.slice(0, $store!.restoreIndex + 1);

        if ($store!.restore.length > 20) {
            $store!.restore.shift();
            $store!.restoreIndex = $store!.restore.length - 1;
        }
    }

    function undo() {
        if ($store!.restoreIndex <= 0) {
            renderContext.clearRect(0, 0, canvas.width, canvas.height);
            $store!.restoreIndex = -1;
        } else {
            $store!.restoreIndex--;
            renderContext.putImageData(
                $store!.restore[$store!.restoreIndex],
                0,
                0,
            );
        }
    }

    function redo() {
        if ($store!.restoreIndex + 1 >= $store!.restore.length) {
            return;
        } else {
            $store!.restoreIndex++;
            renderContext.putImageData(
                $store!.restore[$store!.restoreIndex],
                0,
                0,
            );
        }
    }

    function start(event: MouseEvent | TouchEvent) {
        is_drawing = true;
        renderContext.beginPath();
        renderContext.moveTo(getX(event), getY(event));
        event.preventDefault();
    }

    function draw(event: MouseEvent | TouchEvent) {
        if (!is_drawing) return;

        const color = $store!.color;
        renderContext.lineTo(getX(event), getY(event));
        renderContext.strokeStyle = color;
        renderContext.lineWidth = $store!.thickness;
        renderContext.lineCap = "round";
        renderContext.lineJoin = "round";
        renderContext.stroke();
        event.preventDefault();

        if (color !== latestColor) {
            store!.update((v) => {
                v.latestColors = handleLatestColors(
                    $store!.latestColors,
                    color,
                );
                return v;
            });

            latestColor = color;
        }
    }

    function stop(event: MouseEvent | TouchEvent) {
        if (!is_drawing) return;
        renderContext.stroke();
        renderContext.closePath();
        is_drawing = false;
        event.preventDefault();
        saveState();
    }

    function getX(event: MouseEvent | TouchEvent) {
        const rect = canvas.getBoundingClientRect();
        if ("touches" in event) return event.touches[0].clientX - rect.left;
        return (event as MouseEvent).clientX - rect.left;
    }

    function getY(event: MouseEvent | TouchEvent) {
        const rect = canvas.getBoundingClientRect();
        if ("touches" in event) return event.touches[0].clientY - rect.top;
        return (event as MouseEvent).clientY - rect.top;
    }

    function resizeCanvas() {
        const rect = canvas.parentElement!.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    $store!.undo = undo;
    $store!.redo = redo;

    onMount(async () => {
        renderContext = canvas.getContext("2d", { willReadFrequently: true })!;
        renderContext.drawImage = () => {
            alert("Slacker, time to actually create something.");
        };

        if ($store!.restoreIndex >= 0) {
            setTimeout(() => {
                renderContext.putImageData(
                    $store!.restore[$store!.restoreIndex],
                    0,
                    0,
                );
                console.log("AAA");
            }, 0);
        }

        resizeCanvas();
    });
</script>

<!-- enough -->
<svelte:window onresize={resizeCanvas} />

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<canvas
    class="absolute inset-0"
    ontouchstart={start}
    ontouchmove={draw}
    ontouchend={stop}
    onmousedown={start}
    onmousemove={draw}
    onmouseup={stop}
    onmouseout={stop}
    bind:this={canvas}
>
</canvas>

<style>
    canvas {
        touch-action: none;
    }
</style>
