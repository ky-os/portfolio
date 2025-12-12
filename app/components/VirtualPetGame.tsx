
"use client";

import React, { useEffect, useRef, useCallback } from "react";
import kaplay, { KAPLAYCtx, GameObj, Vec2 } from "kaplay";

interface PetData {
    id: number;
    initialPosition?: { x: number; y: number };
    lifespan?: number;
    isExiting?: boolean;
    variant?: "dog1" | "dog2";
}

interface VirtualPetGameProps {
    pets: PetData[];
    isGuarding: boolean;
    guardTarget: { x: number; y: number } | null;
    onPetLifespanEnd: (id: number) => void;
    onPetExitComplete: (id: number) => void;
    onPlayerDamage?: () => void;
    playerHealth?: number;
}

export default function VirtualPetGame({
    pets,
    isGuarding,
    guardTarget,
    onPetLifespanEnd,
    onPetExitComplete,
    onPlayerDamage,
    playerHealth = 3
}: VirtualPetGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const kRef = useRef<KAPLAYCtx | null>(null);
    const petsMapRef = useRef<Map<number, GameObj>>(new Map());
    const heartsRef = useRef<GameObj[]>([]);

    // Define spawnPet first so it can be used in effects
    const spawnPet = useCallback((k: KAPLAYCtx, data: PetData) => {
        const startPos = data.initialPosition
            ? k.vec2(data.initialPosition.x, data.initialPosition.y)
            : k.vec2(k.rand(0, k.width()), k.rand(0, k.height()));

        const variant = data.variant || (k.rand(0, 1) > 0.5 ? "dog1" : "dog2");

        const pet = k.add([
            k.sprite(`${variant}_sit`, { anim: "idle" }),
            k.pos(startPos),
            k.area(),
            k.anchor("top"),
            k.scale(1.5),
            k.state("idle", ["idle", "walk", "sit", "play", "exit", "death", "hurt"]),
            k.timer(),
            {
                id: data.id,
                speed: 80,
                target: null as Vec2 | null,
                isGuarding: false,
                guardTarget: null as Vec2 | null,
                isExiting: data.isExiting,
                lifespan: data.lifespan,
                timeAlive: 0,
                variant: variant,
                curSprite: `${variant}_sit`,
                health: 3,
                attackCooldown: 0,
            },
            "pet"
        ]);

        petsMapRef.current.set(data.id, pet);

        // --- BEHAVIORS ---

        pet.onClick(() => {
            if (pet.state === "death" || pet.state === "hurt") return;

            pet.health -= 1;

            if (pet.health <= 0) {
                pet.enterState("death");
            } else {
                pet.enterState("hurt");
            }
        });

        pet.onUpdate(() => {
            // Lifespan
            if (pet.lifespan && pet.lifespan > 0 && pet.state !== "death") {
                pet.timeAlive += k.dt() * 1000;
                if (pet.timeAlive >= pet.lifespan && !pet.isExiting) {
                    onPetLifespanEnd(pet.id as number);
                }
            }

            // Check exit state
            if (pet.isExiting && pet.state !== "exit" && pet.state !== "death" && pet.state !== "hurt") {
                pet.enterState("exit");
            }
        });

        // IDLE
        pet.onStateEnter("idle", () => {
            const spriteName = `${pet.variant}_sit`;
            pet.use(k.sprite(spriteName));
            pet.curSprite = spriteName;
            pet.play("idle");
            pet.wait(k.rand(2, 5), () => {
                if (!pet.isGuarding && !pet.isExiting) {
                    pet.enterState("walk");
                }
            });
        });

        pet.onStateUpdate("idle", () => {
            if (pet.isGuarding) pet.enterState("walk");
        });

        // WALK
        pet.onStateEnter("walk", () => {
            if (pet.isGuarding && pet.guardTarget) {
                pet.target = pet.guardTarget;
            } else {
                pet.target = k.vec2(k.rand(50, k.width() - 50), k.rand(50, k.height() - 50));
            }
        });

        pet.onStateUpdate("walk", () => {
            if (pet.isGuarding && pet.guardTarget) {
                pet.target = pet.guardTarget;
            }

            if (!pet.target) return;

            const dir = pet.target.sub(pet.pos);
            const dist = dir.len();

            if (dist < 10) {
                if (pet.isGuarding) {
                    pet.enterState("play");
                } else {
                    pet.enterState("idle");
                }
                return;
            }

            // Flip sprite based on direction
            const isRight = dir.x > 0;

            const walkSprite = `${pet.variant}_walk`;
            if (pet.curSprite !== walkSprite) {
                pet.use(k.sprite(walkSprite));
                pet.curSprite = walkSprite;
                pet.play("walk");
            }

            pet.flipX = !isRight;

            if (pet.curAnim() !== "walk") {
                pet.play("walk");
            }

            pet.move(dir.unit().scale(pet.speed));
        });

        // PLAY
        pet.onStateEnter("play", () => {
            const spriteName = `${pet.variant}_play`;
            pet.use(k.sprite(spriteName));
            pet.curSprite = spriteName;
            pet.play("idle");
            pet.attackCooldown = 0;
        });

        pet.onStateUpdate("play", () => {
            if (pet.isGuarding && pet.guardTarget) {
                const dist = pet.pos.dist(pet.guardTarget);

                // Attack logic
                if (dist < 30) {
                    pet.attackCooldown -= k.dt();
                    if (pet.attackCooldown <= 0) {
                        if (onPlayerDamage) onPlayerDamage();
                        pet.attackCooldown = 1.5; // 1.5s cooldown between hits
                    }
                }

                if (dist > 50) {
                    pet.enterState("walk");
                }
            } else {
                pet.enterState("idle");
            }
        });

        // EXIT
        pet.onStateEnter("exit", () => {
            const leftExit = k.vec2(-100, pet.pos.y);
            const rightExit = k.vec2(k.width() + 100, pet.pos.y);

            if (pet.pos.dist(leftExit) < pet.pos.dist(rightExit)) {
                pet.target = leftExit;
            } else {
                pet.target = rightExit;
            }
        });

        pet.onStateUpdate("exit", () => {
            if (!pet.target) return;

            const dir = pet.target.sub(pet.pos);

            const isRight = dir.x > 0;

            const walkSprite = `${pet.variant}_walk`;
            if (pet.curSprite !== walkSprite) {
                pet.use(k.sprite(walkSprite));
                pet.curSprite = walkSprite;
                pet.play("walk");
            }

            pet.flipX = !isRight;

            if (pet.curAnim() !== "walk") pet.play("walk");

            pet.move(dir.unit().scale(pet.speed));

            if (pet.pos.dist(pet.target) < 10) {
                if (pet.id != null) {
                    onPetExitComplete(pet.id as number);
                    k.destroy(pet);
                    petsMapRef.current.delete(pet.id as number);
                }
            }
        });

        // DEATH
        pet.onStateEnter("death", () => {
            const spriteName = `${pet.variant}_death`;
            pet.use(k.sprite(spriteName));
            pet.curSprite = spriteName;
            pet.play("death");

            pet.wait(1, () => {
                if (pet.id != null) {
                    onPetExitComplete(pet.id as number);
                    k.destroy(pet);
                    petsMapRef.current.delete(pet.id as number);
                }
            });
        });

        // HURT
        pet.onStateEnter("hurt", () => {
            const spriteName = `${pet.variant}_hurt`;
            pet.use(k.sprite(spriteName));
            pet.curSprite = spriteName;
            pet.play("hurt");

            pet.wait(0.5, () => {
                if (pet.state === "hurt") {
                    pet.enterState("idle");
                }
            });
        });
    }, [onPetLifespanEnd, onPetExitComplete, onPlayerDamage]);

    // Initialize Kaplay
    useEffect(() => {
        if (!canvasRef.current || kRef.current) return;

        const petsMap = petsMapRef.current;

        let rafId: number | null = null;
        let k: KAPLAYCtx | null = null;

        // In React 18 Strict Mode (dev), effects mount/unmount/mount rapidly.
        // Kaplay keeps a singleton internally and quit() finishes on frameEnd,
        // so we defer initialization to the next frame to avoid triggering
        // the "already initialized" warning during the same tick.
        rafId = window.requestAnimationFrame(() => {
            if (!canvasRef.current || kRef.current) return;

            const rect = canvasRef.current.getBoundingClientRect();
            const width = rect.width || window.innerWidth;
            const height = rect.height || 300;

            k = kaplay({
                canvas: canvasRef.current,
                width: width,
                height: height,
                background: [0, 0, 0, 0],
                global: false,
                debug: false,
                pixelDensity: 2,
                loadingScreen: false,
                focus: false,
            });
            kRef.current = k;

            // Load Sprites
            // 6-frame strip for Walking
            const walkSliceConfig = {
                sliceX: 6,
                anims: {
                    walk: { from: 0, to: 5, loop: true, speed: 10 },
                }
            };

            // 4-frame strip for Idle
            const idleSliceConfig = {
                sliceX: 4,
                anims: {
                    idle: { from: 0, to: 3, loop: true, speed: 8 },
                }
            };

            // 4-frame strip for Attack (used for Play/Bark)
            const attackSliceConfig = {
                sliceX: 4,
                anims: {
                    idle: { from: 0, to: 3, loop: true, speed: 8 },
                }
            };

            // 4-frame strip for Death
            const deathSliceConfig = {
                sliceX: 4,
                anims: {
                    death: { from: 0, to: 3, loop: false, speed: 8 },
                }
            };

            // 2-frame strip for Hurt
            const hurtSliceConfig = {
                sliceX: 2,
                anims: {
                    hurt: { from: 0, to: 1, loop: true, speed: 8 },
                }
            };

            // Dog 1
            k.loadSprite("dog1_walk", encodeURI("/pet/dog-1/Walk.png"), walkSliceConfig);
            k.loadSprite("dog1_sit", encodeURI("/pet/dog-1/Idle.png"), idleSliceConfig);
            k.loadSprite("dog1_play", encodeURI("/pet/dog-1/Attack.png"), attackSliceConfig);
            k.loadSprite("dog1_death", encodeURI("/pet/dog-1/Death.png"), deathSliceConfig);
            k.loadSprite("dog1_hurt", encodeURI("/pet/dog-1/Hurt.png"), hurtSliceConfig);

            // Dog 2
            k.loadSprite("dog2_walk", encodeURI("/pet/dog-2/Walk.png"), walkSliceConfig);
            k.loadSprite("dog2_sit", encodeURI("/pet/dog-2/Idle.png"), idleSliceConfig);
            k.loadSprite("dog2_play", encodeURI("/pet/dog-2/Attack.png"), attackSliceConfig);
            k.loadSprite("dog2_death", encodeURI("/pet/dog-2/Death.png"), deathSliceConfig);
            k.loadSprite("dog2_hurt", encodeURI("/pet/dog-2/Hurt.png"), hurtSliceConfig);

            // Create Hearts for Health Bar
            const hearts: GameObj[] = [];
            for (let i = 0; i < 3; i++) {
                const heart = k.add([
                    k.text("♥", { size: 24, font: "sans-serif" }),
                    k.pos(0, 0),
                    k.color(255, 0, 0),
                    k.opacity(0),
                    k.anchor("center"),
                    k.z(100), // Ensure it's on top
                    "heart"
                ]);
                hearts.push(heart);
            }
            heartsRef.current = hearts;
        });

        return () => {
            if (rafId != null) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }

            // React StrictMode will mount/unmount/mount in dev.
            // Kaplay keeps a singleton internally, so we must quit on unmount.
            try {
                k?.quit();
            } finally {
                kRef.current = null;
                petsMap.clear();
                heartsRef.current = [];
            }
        };

    }, []);

    // Handle Resize
    useEffect(() => {
        const k = kRef.current;
        if (!k || !canvasRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            if (canvasRef.current) {
                // Ensure canvas style matches container
                canvasRef.current.style.width = "100%";
                canvasRef.current.style.height = "100%";
            }
        });

        resizeObserver.observe(canvasRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Sync Pets
    useEffect(() => {
        const k = kRef.current;
        if (!k) return;

        pets.forEach(petData => {
            if (!petsMapRef.current.has(petData.id)) {
                spawnPet(k, petData);
            }
        });

        const currentIds = new Set(pets.map(p => p.id));
        petsMapRef.current.forEach((gameObj, id) => {
            if (!currentIds.has(id)) {
                k.destroy(gameObj);
                petsMapRef.current.delete(id);
            }
        });

        pets.forEach(petData => {
            const gameObj = petsMapRef.current.get(petData.id);
            if (gameObj) {
                gameObj.isExiting = petData.isExiting;
                gameObj.lifespan = petData.lifespan;
            }
        });

    }, [pets, spawnPet]);

    // Sync Guard State & Cursor
    useEffect(() => {
        const k = kRef.current;
        if (!k) return;

        // Update Pets
        petsMapRef.current.forEach((pet, id) => {
            pet.isGuarding = isGuarding;

            if (guardTarget && canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const localX = guardTarget.x - rect.left;
                const localY = guardTarget.y - rect.top;

                const offset = (id % 3 - 1) * 60;

                pet.guardTarget = k.vec2(localX + offset, localY);
            } else {
                pet.guardTarget = null;
            }
        });

        // Update Hearts Position & Visibility
        if (guardTarget && canvasRef.current && isGuarding) {
            const rect = canvasRef.current.getBoundingClientRect();
            const localX = guardTarget.x - rect.left;
            const localY = guardTarget.y - rect.top;

            heartsRef.current.forEach((heart, i) => {
                heart.pos = k.vec2(localX + (i - 1) * 25, localY - 40);
                heart.opacity = 1;
            });
        } else {
            heartsRef.current.forEach(heart => {
                heart.opacity = 0;
            });
        }
    }, [isGuarding, guardTarget]);

    // Sync Player Health
    useEffect(() => {
        const k = kRef.current;
        if (!k) return;

        heartsRef.current.forEach((heart, i) => {
            if (i < playerHealth) {
                heart.color = k.rgb(255, 0, 0); // Red
                heart.scale = k.vec2(1.2);
            } else {
                heart.color = k.rgb(100, 100, 100); // Gray
                heart.scale = k.vec2(0.8);
            }
        });
    }, [playerHealth]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-0"
        />
    );
}

