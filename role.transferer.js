var roleTransferer = {  

    /** @param {Creep} creep **/  
    run: function(creep) {  
        // 如果正在转移且能量为0，则停止转移  
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] === 0) {  
            creep.memory.transfering = false;  
            creep.say('😃下班了！好耶');  
        }  
        // 如果不在转移且容量已满，则开始转移  
        if (!creep.memory.transfering && (creep.store.getFreeCapacity() === 0 || creep.store[RESOURCE_HYDROGEN] >= creep.store.getCapacity() * 0.2) ) {  
            creep.memory.transfering = true;  
            creep.say('😟上班了！呜呜呜');  
        }  
        // 如果不在转移  
        if (!creep.memory.transfering) {  
            // 预设的容器坐标  
            const energyContainerCoords = [  
                {x: 15, y: 6},  
                {x: 40, y: 27}  
            ];  
            const mineralContainerCoords = {x: 46, y: 40};  
            // 查找所有结构，然后筛选  
            var containers = creep.room.find(FIND_STRUCTURES, {  
                filter: (structure) => {  
                    return structure.structureType === STRUCTURE_CONTAINER;  
                }  
            });  
            if(!creep.memory.workLoc){
                creep.memory.workLoc = 0;
            }
            // 根据creep的workLoc找到对应的容器  
            var targetContainer = null;  
            if (containers.length > 0) {  
                let targetCoords = null;  
                if (creep.memory.workLoc === 0) {  
                    targetCoords = energyContainerCoords[0];  
                } else if (creep.memory.workLoc === 1) {  
                    targetCoords = energyContainerCoords[1];  
                } else if (creep.memory.workLoc === 2) {  
                    targetCoords = mineralContainerCoords;  
                }  
                if (targetCoords) {  
                    for (let container of containers) {  
                        if (container.pos.x === targetCoords.x && container.pos.y === targetCoords.y) {  
                            targetContainer = container;  
                            break;  
                        }  
                    }  
                }  
                if (creep.memory.workLoc != 2) {  
                    if (creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                        creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffffff'}});  
                    }  
                } else {  
                    // 尝试提取氢  
                    if (creep.withdraw(targetContainer, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {  
                        creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffffff'}});  
                    }  
                    // 如果背包未满，也尝试提取能量  
                    if (creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                        creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffffff'}});  
                    }  
                }
            }  
        }
        else {  
            var targets = creep.room.find(FIND_STRUCTURES, {    
                filter: (structure) => {    
                    return (structure.structureType === STRUCTURE_STORAGE) &&    
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;    
                }    
            });    
            if (targets.length > 0) {  
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});  
                } else if(creep.transfer(targets[0], RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});  
                }
            }
        }  
    }  
};  

module.exports = roleTransferer;