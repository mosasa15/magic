var roleBuilder = {  
    /** @param {Creep} creep **/  
    run: function(creep) {  
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { // building状态且背包为空  
            creep.memory.building = false;  // 变为非building状态  
            creep.say('🔄 harvest');  
        }  
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) { // 非building状态且背包满  
            creep.memory.building = true;  // 变为building状态  
            creep.say('🚧 build');  
        }  
        if(creep.memory.building) {  // 检查是否处于building状态  
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // 寻找建筑位  
            if(targets.length) {  // 如果存在建筑位  
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {  // 如果不在建筑范围内  
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}); // 绘制路径并前往建筑位  
                }  
            } else {  // 如果没有建筑位  
                // 检查并修复Rampart  
                var ramparts = creep.room.find(FIND_STRUCTURES, {  
                    filter: (structure) => {  
                        return structure.structureType === STRUCTURE_RAMPART && structure.hits < structure.hitsMax * 0.03;  
                    }  
                });  
                if (ramparts.length > 0) {  // 如果存在需要修复的Rampart  
                    if (creep.repair(ramparts[0]) == ERR_NOT_IN_RANGE) {  // 如果不在修复范围内  
                        creep.moveTo(ramparts[0], {visualizePathStyle: {stroke: '#ffffff'}});  // 绘制路径并前往Rampart  
                    }  
                } else {  // 如果没有需要修复的Rampart  
                    // 尝试升级控制器  
                    var controller = creep.room.controller;  
                    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {  
                        creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});  // 绘制路径并前往控制器  
                    }  
                }  
            }  
        } 
        else {  // 非building状态  
            var targets = creep.room.find(FIND_STRUCTURES, {    
                filter: (structure) => {    
                    return (structure.structureType == STRUCTURE_STORAGE ) &&    
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;    
                }    
            });    
            if (targets.length > 0) {    
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {    
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});    
                }    
            }  
        }  
    }  
};  
module.exports = roleBuilder;
