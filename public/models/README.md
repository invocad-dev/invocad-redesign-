# Invocad 3D Models Directory

Place production `.glb` or `.gltf` mechanical models here:

- `/models/hero-machine.glb` — Primary 3D mechanical assembly for the homepage showroom.
- `/models/project-01.glb` — 3D model for Color Sorting Output Conveyor.
- `/models/project-02.glb` — 3D model for Flat Belt Conveyor.
- `/models/project-03.glb` — 3D model for Modular Conveyor.
- `/models/project-04.glb` — 3D model for Makhana Grader.

The 3D engine in `MechanicalScene.tsx` automatically detects if `/models/hero-machine.glb` exists. If not found, it seamlessly renders the high-precision procedural mechanical assembly (planetary gear drive with machined teeth, bearings, shaft, carrier, and fasteners).
