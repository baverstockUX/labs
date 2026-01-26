'use client';

import { useEffect, useRef } from 'react';

export function ConnectedPointsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let target = { x: width / 2, y: height / 2 };
        let points: Point[] = [];
        let animationFrameId: number;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        class Point {
            x: number;
            y: number;
            originX: number;
            originY: number;
            closest: Point[];
            circle: Circle | null;
            active: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.originX = x;
                this.y = y;
                this.originY = y;
                this.closest = [];
                this.circle = null;
                this.active = 0;
            }

            // Replaces TweenLite logic with simple easing
            targetX: number | null = null;
            targetY: number | null = null;

            update() {
                if (this.targetX === null || this.targetY === null) {
                    this.targetX = this.originX - 50 + Math.random() * 100;
                    this.targetY = this.originY - 50 + Math.random() * 100;
                }

                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;

                this.x += dx * 0.02; // Easing factor
                this.y += dy * 0.02;

                if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                    this.targetX = null;
                    this.targetY = null;
                }
            }
        }

        class Circle {
            pos: Point;
            radius: number;
            color: string;
            active: number;

            constructor(pos: Point, rad: number, color: string) {
                this.pos = pos;
                this.radius = rad;
                this.color = color;
                this.active = 0;
            }

            draw() {
                if (!ctx) return;
                if (!this.active) return;
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
                // Fiery Orange/Red with opacity
                ctx.fillStyle = `rgba(243, 147, 0, ${this.active})`;
                ctx.fill();
            }
        }

        const initHeader = () => {
            setSize();
            points = [];

            // Grid spacing
            const spacingX = width / 20;
            const spacingY = height / 20;

            for (let x = 0; x < width; x += spacingX) {
                for (let y = 0; y < height; y += spacingY) {
                    const px = x + Math.random() * spacingX;
                    const py = y + Math.random() * spacingY;
                    const p = new Point(px, py);
                    points.push(p);
                }
            }

            // Find 5 closest points
            for (let i = 0; i < points.length; i++) {
                let closest: Point[] = [];
                let p1 = points[i];
                for (let j = 0; j < points.length; j++) {
                    let p2 = points[j];
                    if (p1 !== p2) {
                        let placed = false;
                        for (let k = 0; k < 5; k++) {
                            if (!placed) {
                                if (closest[k] === undefined) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }

                        for (let k = 0; k < 5; k++) {
                            if (!placed) {
                                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
                    }
                }
                p1.closest = closest;
            }

            // Assign circles
            for (let i in points) {
                const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
                points[i].circle = c;
            }
        };

        const getDistance = (p1: Point | { x: number, y: number }, p2: Point | { x: number, y: number }) => {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (let i in points) {
                const p = points[i];

                // Detect points in range of mouse
                const dist = Math.abs(getDistance(target, p));
                if (dist < 4000) {
                    p.active = 0.3;
                    p.circle!.active = 0.6;
                } else if (dist < 20000) {
                    p.active = 0.1;
                    p.circle!.active = 0.3;
                } else if (dist < 40000) {
                    p.active = 0.02;
                    p.circle!.active = 0.1;
                } else {
                    p.active = 0;
                    p.circle!.active = 0;
                }

                drawLines(p);
                p.circle!.draw();
                p.update(); // Native animation update
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const drawLines = (p: Point) => {
            if (!p.active || !ctx) return;
            for (let i in p.closest) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.closest[i].x, p.closest[i].y);
                // Coral Red lines with opacity
                ctx.strokeStyle = `rgba(255, 60, 54, ${p.active})`;
                ctx.stroke();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            let posx = 0, posy = 0;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            target.x = posx;
            target.y = posy;
        };

        const handleResize = () => {
            setSize();
            initHeader(); // Re-init on resize to distribute points
        };

        // Init
        initHeader();
        animate();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
