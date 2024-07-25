var NewSpawnFunction = {  
    run: function(target) {  
        
        var sourceRooms = ['E56N13','E55N13','E57N13']; 
        var targetRooms = ['E56N13','E55N13','E57N13']; 
        var spawn = target;  
        var roleConfigs = [  
            { role: 'manager',          sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 2, priority: 10},   //priority 越大越优先生产 workLoc 越靠后越优先生产
            { role: 'NewHarvester',     sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 1, priority: 9},    //priority 相同的时候，排名靠下优先生产
            { role: 'Newtransferer',    sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 1, priority: 8}, 
            { role: 'upgrader',         sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 1, priority: 7}, 
            { role: 'builder',          sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 3, priority: 6},
            { role: 'scavenger',        sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 0, priority: 6},
            { role: 'attacker',         sourceRoom: sourceRooms[2], targetRoom: targetRooms[2], workLoc: [0],     maxNumber: 1, priority: 5}, 
            { role: 'attacker',         sourceRoom: sourceRooms[1], targetRoom: targetRooms[1], workLoc: [0],     maxNumber: 1, priority: 5}, 
            //{ role: 'adventurer',       sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 0, priority: 5},    

            //{ role: 'Centraltransferer',sourceRoom: sourceRooms[0], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 1, priority: 4}, 
            
            { role: 'reserveController',sourceRoom: sourceRooms[1], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 1, priority: 3}, 
            { role: 'reserveController',sourceRoom: sourceRooms[2], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 1, priority: 3},   

            { role: 'Newtransferer',    sourceRoom: sourceRooms[2], targetRoom: targetRooms[0], workLoc: [0],     maxNumber: 1, priority: 2},     //E57N13
            { role: 'NewHarvester',     sourceRoom: sourceRooms[2], targetRoom: targetRooms[2], workLoc: [0],     maxNumber: 1, priority: 1},     //E57N13 
            //{ role: 'Newbuilder',       sourceRoom: sourceRooms[2], targetRoom: targetRooms[2], workLoc: [0],     maxNumber: 1, priority: 1},     //E57N13 

            { role: 'Newtransferer',    sourceRoom: sourceRooms[1], targetRoom: targetRooms[0], workLoc: [1,0],   maxNumber: 1, priority: 1},
            { role: 'NewHarvester',     sourceRoom: sourceRooms[1], targetRoom: targetRooms[1], workLoc: [1,0],   maxNumber: 1, priority: 1},     //E55N13
            //{ role: 'Newbuilder',       sourceRoom: sourceRooms[1], targetRoom: targetRooms[1], workLoc: [1,0],   maxNumber: 1, priority: 1},     //E55N13
        ];  
        roleConfigs.sort((a, b) => a.priority - b.priority) // 先按优先级排序

        for (let config of roleConfigs) {    

            let workLocs = Array.isArray(config.workLoc) ? config.workLoc : [config.workLoc];  
            for (let workLoc of workLocs) {    

                //console.log(`检查 limit for ${config.role} in ${config.sourceRoom} with workLoc ${workLoc}`);  日志

                if (checkCreepLimit(config.role, config.sourceRoom, config.targetRoom, workLoc, config.maxNumber)) {    
                    //console.log(`Spawning ${config.role} in ${spawn.room.name} with workLoc ${workLoc}`);    日志
                    spawnCreep(spawn, config.role, config.sourceRoom, config.targetRoom, workLoc, createCreepBody(config.role));  
                } else {  
                    //console.log(`已经到达极限 ${config.role} with workLoc ${workLoc}`);  日志
                }  
            }    
        }
    
        // 显示正在生成的Creep的信息
        if(Game.spawns['E56N13'].spawning) { // 孵化过程可视化
            var spawningCreep = Game.creeps[Game.spawns['E56N13'].spawning.name];
            Game.spawns['E56N13'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['E56N13'].pos.x + 1, 
                Game.spawns['E56N13'].pos.y, 
                {align: 'left', opacity: 0.8});
        }   
    }  
};

function checkCreepLimit(role, sourceRoom, targetRoom, workLoc, maxNumber) {  
    let count = 0;  
    const creeps = Game.creeps; // 提前获取Game.creeps，减少在循环中的访问次数  
    // 遍历Game.creeps中的所有creep  
    for (const name in creeps) {  
        const creep = creeps[name]; // 存储当前creep的引用  
        // 检查creep的记忆是否与给定参数匹配  
        if (  
            creep.memory.role === role &&  
            creep.memory.sourceRoomName === sourceRoom &&  
            creep.memory.targetRoomName === targetRoom &&  
            creep.memory.workLoc === workLoc  
        ) {  
            count++; // 如果匹配，则计数器加一  
        }  
    }  
    // 返回当前数量是否小于最大数量  
    return count < maxNumber;  
}

function createCreepBody(role) {    //返回body
    let body;  
    switch (role) {  
        case 'harvester':  
            body = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE];  
            break;  
        case 'transferer':  
            body = [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'manager':  
            body = [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'upgrader':  
            body = [WORK,WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'builder':  
            body = [WORK,WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'attacker':  
            body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];  
            break;  
        case 'adventurer':  
            body = [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'Newtransferer':  
            body = [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'scavenger':  
            body = [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'Centraltransferer':  
            body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE];  
            break;  
        case 'reserveController':  
            body = [CLAIM,CLAIM,MOVE,MOVE];  
            break;  
        case 'NewHarvester':  
            body = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        case 'Newbuilder':  
            body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];  
            break;  
        default:  
            body = [TOUGH]; 
    }  
    return body;  
}


function spawnCreep(spawn, role, sourceRoom, targetRoom, workLoc, body) {  
    // 检查spawn是否正在生成其他creep  
    if (spawn.spawning === null) {  
        // 构造Creep的名称
        let newName;  
        if (sourceRoom) { 
            newName = `${role}_${sourceRoom}_${Game.time}_${workLoc}`;  
        } else { 
            newName = `${role}_${Game.time}`;  
        }  
        // 尝试生成Creep  
        const result = spawn.spawnCreep(body, newName, {  
            memory: {  
                role: role,  
                sourceRoomName: sourceRoom, 
                targetRoomName: targetRoom,  
                workLoc: workLoc  
            }  
        });  
        // 检查生成结果  
        // if (result === OK) {  
        //     console.log(`成功 生产 ${newName} as a ${role}`);  
        // } else {  
        //     console.log(`失败 生产 ${role} creep: ${result}`);  
        // }  
        
    } 
}

module.exports = NewSpawnFunction;