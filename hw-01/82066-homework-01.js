vaxInit();
renderer.shadowMap.enabled = true;

var isEating = false;
var currBushIdx = 0;
var startedEatingAt = -1;
var eatBushFor = 2;

function createGround() {
    groundSize = new THREE.Vector3(100, 2, 400);
    var material = new THREE.MeshPhongMaterial({color: 'green'});
    // create ground object
    geometry = new THREE.BoxGeometry(groundSize.x, groundSize.y, groundSize.z);
    var ground = new THREE.Mesh(geometry, material);
    ground.position.set(0, 0, 150);
    scene.add(ground);
    // ground should receive shadows
    ground.receiveShadow = true;
}

function setupCamera() {
    camera.position.set(0, 30, 50);
    camera.lookAt(0, 10, 0);
}

function setupLights() {
    scene.remove(light);
    // create front-left light
    lightFrontLeft = new THREE.PointLight( 'white' );
    lightFrontLeft.position.set(200, 300, 200);
    lightFrontLeft.castShadow = true;
    lightFrontLeft.shadow.mapSize.width = 4096;
	lightFrontLeft.shadow.mapSize.height = 4096;
    scene.add(lightFrontLeft);
    // create front-right light
    lightFrontRight = new THREE.PointLight( 'white' );
    lightFrontRight.position.set(-300, 300, 200);
    lightFrontRight.castShadow = true;
    lightFrontRight.shadow.mapSize.width = 4096;
	lightFrontRight.shadow.mapSize.height = 4096;
    scene.add(lightFrontRight);
    // create back light
    lightBack = new THREE.PointLight( 'white' );
    lightBack.position.set(0, 300, -300);
    lightBack.castShadow = true;
    lightBack.shadow.mapSize.width = 4096;
	lightBack.shadow.mapSize.height = 4096;
    scene.add(lightBack);
}

function createHead() {
    var material, geometry, object;
    var distBetweenEyes = 1.8;
    var eyesHeight = 1.5;
    var eyesRadius = 1.2;
    var pupilsRadius = 0.3;
    var pupilsHeight = 1.5;
    var distBetweenPupils = 1.7;
    var earSize = new THREE.Vector3(3, 3, 1);
    var earAngle = -Math.PI / 15;
    var earsHeight = 6;
    var distBetweenEars = 4;
    var earInsideSize = new THREE.Vector3(2, 2, 1);
    var earsInsideHeight = 6;
    var distBetweenInsideEars = 4;
    var eyebrowsSize = new THREE.Vector3(3, 0.5, 1);
    var distBetweenEyebrows = 2.2;
    var eyebrowsAngle = 0.2;
    // create head group
    head = new THREE.Group();
    head.position.set(0, 20, 0);
    // create skull object
    geometry = new THREE.BoxGeometry(10, 10, 10);
    material = new THREE.MeshPhongMaterial({color:'rgb(122, 70, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, 0, 0);
    object.castShadow = true;
    head.add(object);
    // create nose object
    geometry = new THREE.BoxGeometry(7, 3, 3);
    material = new THREE.MeshPhongMaterial({color:'rgb(88, 40, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, -1.8, 4.3);
    head.add(object);
    // create nostril object
    geometry = new THREE.BoxGeometry(1.8, 1, 3);
    material = new THREE.MeshPhongMaterial({color:'rgb(32, 10, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, -0.5, 4.6);
    head.add(object);
    // create left ear
    geometry = new THREE.BoxGeometry(earSize.x, earSize.y, earSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(88, 40, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(distBetweenEars, earsHeight, 4.8);
    object.rotation.set(0, 0, earAngle);
    head.add(object);
    // create right ear
    geometry = new THREE.BoxGeometry(earSize.x, earSize.y, earSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(88, 40, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(-distBetweenEars, earsHeight, 4.8);
    object.rotation.set(0, 0, -earAngle);
    head.add(object);
    // create left inside ear
    geometry = new THREE.BoxGeometry(earInsideSize.x, earInsideSize.y, earInsideSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(122, 70, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(distBetweenInsideEars, earsInsideHeight, 4.9);
    object.rotation.set(0, 0, earAngle);
    head.add(object);
    // create right inside ear
    geometry = new THREE.BoxGeometry(earInsideSize.x, earInsideSize.y, earInsideSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(122, 70, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(-distBetweenInsideEars, earsInsideHeight, 4.9);
    object.rotation.set(0, 0, -earAngle);
    head.add(object);
    // create left eyebrow
    geometry = new THREE.BoxGeometry(eyebrowsSize.x, eyebrowsSize.y, eyebrowsSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(88, 40, 2)', shininess: 0});
    object = new THREE.Mesh(geometry, material);
    object.position.set(-distBetweenEyebrows, 3, 4.8);
    object.rotation.set(0, 0, eyebrowsAngle);
    head.add(object);
    // create left eye
    geometry = new THREE.SphereGeometry(eyesRadius);
    material = new THREE.MeshPhongMaterial({color:'rgb(255, 220, 220)', shininess: 70});
    object = new THREE.Mesh(geometry, material);
    object.position.set(distBetweenEyes, eyesHeight, 4.8);
    head.add(object);
    // create right eye
    geometry = new THREE.SphereGeometry(eyesRadius);
    material = new THREE.MeshPhongMaterial({color:'rgb(255, 220, 220)', shininess: 70});
    object = new THREE.Mesh(geometry, material);
    object.position.set(-distBetweenEyes, eyesHeight, 4.8);
    head.add(object);
    // create left pupil
    geometry = new THREE.SphereGeometry(pupilsRadius);
    material = new THREE.MeshPhongMaterial({color:'rgb(0, 0, 0)', shininess: 0});
    object = new THREE.Mesh(geometry, material);
    object.position.set(distBetweenPupils, pupilsHeight, 5.9);
    head.add(object);
    // create left pupil
    geometry = new THREE.SphereGeometry(pupilsRadius);
    material = new THREE.MeshPhongMaterial({color:'rgb(0, 0, 0)', shininess: 0});
    object = new THREE.Mesh(geometry, material);
    object.position.set(-distBetweenPupils, pupilsHeight, 5.9);
    head.add(object);
    // create left eyebrow
    geometry = new THREE.BoxGeometry(eyebrowsSize.x, eyebrowsSize.y, eyebrowsSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(88, 40, 2)', shininess: 0});
    object = new THREE.Mesh(geometry, material);
    object.position.set(distBetweenEyebrows, 3, 4.8);
    object.rotation.set(0, 0, -eyebrowsAngle);
    head.add(object);
    // create right eyebrow
    geometry = new THREE.BoxGeometry(eyebrowsSize.x, eyebrowsSize.y, eyebrowsSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(88, 40, 2)', shininess: 0});
    object = new THREE.Mesh(geometry, material);
    object.position.set(-distBetweenEyebrows, 3, 4.8);
    object.rotation.set(0, 0, eyebrowsAngle);
    head.add(object);
}

function createBody() {
    var material, geometry, object;

    var torsoSize = new THREE.Vector3(14, 10, 20);
    var legSize = new THREE.Vector3(4, 6, 4);
    var tailSize = new THREE.Vector3(1, 5, 1);

    // create body group
    body = new THREE.Group();
    body.position.set(0, 12, -9);
    // create torso object
    geometry = new THREE.BoxGeometry(torsoSize.x, torsoSize.y, torsoSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(100, 50, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, 0, 0);
    object.castShadow = true;
    body.add(object);
    // create front-left leg object
    frontLeftLeg = new THREE.Group();
    frontLeftLeg.position.set(torsoSize.x / 2 - legSize.x / 2, 0, torsoSize.z / 2 - legSize.z / 2);
    geometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(100, 50, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, -torsoSize.y / 2 - legSize.y / 2, 0);
    object.castShadow = true;
    frontLeftLeg.add(object);
    body.add(frontLeftLeg);
    // create front-right leg object
    frontRightLeg = new THREE.Group();
    frontRightLeg.position.set(-torsoSize.x / 2 + legSize.x / 2, 0, torsoSize.z / 2 - legSize.z / 2);
    geometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(100, 50, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, -torsoSize.y / 2 - legSize.y / 2, 0);
    object.castShadow = true;
    frontRightLeg.add(object);
    body.add(frontRightLeg);
    // create back-left leg object
    backLeftLeg = new THREE.Group();
    backLeftLeg.position.set(torsoSize.x / 2 - legSize.x / 2, 0, -torsoSize.z / 2 + legSize.z / 2);
    geometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(100, 50, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, -torsoSize.y / 2 - legSize.y / 2, 0);
    object.castShadow = true;
    backLeftLeg.add(object);
    body.add(backLeftLeg);
    // create back-right leg object
    backRightLeg = new THREE.Group();
    backRightLeg.position.set(-torsoSize.x / 2 + legSize.x / 2, 0, -torsoSize.z / 2 + legSize.z / 2);
    geometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(100, 50, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, -torsoSize.y / 2 - legSize.y / 2, 0);
    object.castShadow = true;
    backRightLeg.add(object);
    body.add(backRightLeg);
    // create tail object
    tail = new THREE.Group();
    tail.position.set(0, 0, -torsoSize.z / 2 - 0.5);
    geometry = new THREE.BoxGeometry(tailSize.x, tailSize.y, tailSize.z);
    material = new THREE.MeshPhongMaterial({color:'rgb(60, 20, 2)', shininess: 10});
    object = new THREE.Mesh(geometry, material);
    object.position.set(0, -tailSize.y / 2, 0);
    object.rotation.set(0.4, 0, 0);
    object.castShadow = true;
    tail.add(object);
    body.add(tail);
}

function createBear() {
    bear = new THREE.Group();
    createHead();
    createBody();
    bear.add(head);
    bear.add(body);
    scene.add(bear);
}

function getRandShadeOfLightGreen() {
    var r = Math.random() * 0.3;
    var g = Math.random() * 0.3 + 0.7;
    var b = Math.random() * 0.3;

    return new THREE.Color(r, g, b);
}

function getRandShadeOfDarkGreen() {
    var r = Math.random() * 0.2;
    var g = Math.random() * 0.3 + 0.3;
    var b = Math.random() * 0.2;

    return new THREE.Color(r, g, b);
}

function createGrass() {
    var material, geometry, object;
    var grassHeight = 6;
    var bigRadius = 0.08;
    var smallRadius = 0;
    var grassCount = 1000;
    var groundBound = 0.05;

    grass = new THREE.Group();
    scene.add(grass);

    for (var i = 0; i < grassCount; i++) {
        material = new THREE.MeshPhongMaterial({color: getRandShadeOfLightGreen()});
        // create grass object
        geometry = new THREE.CylinderGeometry(smallRadius * grassHeight, bigRadius * grassHeight, grassHeight);
        object = new THREE.Mesh(geometry, material);
        object.position.set(
            Math.random() * (groundSize.x * (1-groundBound)) - (groundSize.x * (1-groundBound)) / 2,
            grassHeight / 2,
            Math.random() * (groundSize.z * (1-groundBound)) - (groundSize.x * (1-groundBound)) / 2
        );
        object.rotation.set(
            Math.random() * 0.4 - 0.2,
            0,
            Math.random() * 0.4 - 0.2
        );
        //object.castShadow = true;
        grass.add(object);
    }
}

function createBush(position) {
    var material, geometry, object;
    bushRadius = 9;
    var leafsCount = 60;
    var berryCount = 60;

    var bush = new THREE.Group();
    bush.position.set(position.x, position.y, position.z);
    scene.add(bush);

    for (var i = 0; i < leafsCount; i++) {
        material = new THREE.MeshPhongMaterial({color: getRandShadeOfDarkGreen()});
        // create leaf object
        geometry = new THREE.BoxGeometry(bushRadius * 0.3, bushRadius * 0.3, 0.5);
        object = new THREE.Mesh(geometry, material);
        object.position.set(
            Math.random() * bushRadius - bushRadius / 2,
            Math.random() * bushRadius - bushRadius / 2,
            Math.random() * bushRadius - bushRadius / 2,
        )
        object.rotation.set(
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2
        );
        bush.add(object);
    }
    for (var i = 0; i < berryCount; i++) {
        material = new THREE.MeshPhongMaterial({color: "rgb(10, 20, 90)"});
        // create berry object
        geometry = new THREE.SphereGeometry(bushRadius * 0.07);
        object = new THREE.Mesh(geometry, material);
        object.position.set(
            Math.random() * bushRadius - bushRadius / 2,
            Math.random() * bushRadius - bushRadius / 2,
            Math.random() * bushRadius - bushRadius / 2,
        )
        bush.add(object);
    }

    return bush;
}

function createBushes() {
    bushesCount = 5;
    var bushes = [];

    for (var i = 0; i < bushesCount; i++) {
        var bush = createBush(new THREE.Vector3(0, 7, 60 * i + 40));
        bushes.push(bush);
    }

    return bushes;
}

setupCamera();
setupLights();
createGround();
createGrass();
createBear();

bushes = createBushes();

function runBear(t) {
    bear.position.add(new THREE.Vector3(0, 0, 0.2));

    frontLeftLeg.rotation.set(Math.sin(t * 6) / 6, 0, 0);
    frontRightLeg.rotation.set(Math.sin(t * 6 + 0.6) / 6, 0, 0);
    backLeftLeg.rotation.set(Math.sin(t * 6 + 3) / 6, 0, 0);
    backRightLeg.rotation.set(Math.sin(t * 6 + 3.5) / 6, 0, 0);
}

function eatBear(t) {
    body.rotation.set(Math.sin(t * 7) / 12, 0, 0);
    head.rotation.set(0.4 + Math.sin(t * 7) / 12, 0, 0);
}

function startEatingBear() {
    head.position.add(new THREE.Vector3(0, -10, 4));
}

function stopEatingBear() {
    head.position.add(new THREE.Vector3(0, 10, -4));
    body.rotation.set(0, 0, 0);
    head.rotation.set(0, 0, 0);
}

function animate(t) {
    if (t < 14) {
        scene.rotation.set(0, Math.sin(t/4)/3, 0);
    }
    else {
        scene.rotation.set(0, Math.sin(14/4)/3 + (t-14)/2, 0);
    }
    camera.position.add(new THREE.Vector3(0, 0.01, 0.15));
    lightFrontLeft.position.add(new THREE.Vector3(0, 0, 0.15));
    lightFrontRight.position.add(new THREE.Vector3(0, 0, 0.15));
    lightBack.position.add(new THREE.Vector3(0, 0, 0.2));

    tail.rotation.set(0, 0, Math.sin(t * 10));
    if (isEating) {
        if (t - startedEatingAt > eatBushFor) {
            stopEatingBear();
            isEating = false;
            scene.remove(bushes[currBushIdx]);
            currBushIdx++;
        }
        else {
            eatBear(t);
        }
    }
    else {
        if (currBushIdx < bushesCount && bushes[currBushIdx].position.z - bear.position.z < bushRadius + 7) {
            startEatingBear();
            isEating = true;
            startedEatingAt = t;
        }
        else {
            runBear(t);
        }
    }
}