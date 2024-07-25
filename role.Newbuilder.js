var roleNewbuilder = {  
    /**  
     * @param {Creep} creep 
     */  
    run: function(creep) {  
        const targetRoomName = creep.memory.targetRoomName;  
        const sourceRoomName = creep.memory.sourceRoomName;  
        if (!creep.memory.state) {  
            creep.memory.state = 'harvesting';  
        }  
        
        if (creep.memory.state === 'harvesting') {  
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {  
                if (creep.room.name !== sourceRoomName) {  
                    creep.moveTo(new RoomPosition(20, 25, sourceRoomName), { visualizePathStyle: { stroke: '#0000ff' } });  
                } else {  
                    var targetSource = null;
                    const sources = creep.room.find(FIND_SOURCES);  
                    if (sources.length > 0) {  
                        if (creep.memory.workLoc === 0 && sources[0]) {  
                            targetSource = sources[0];  
                        } else if (creep.memory.workLoc === 1 && sources[1]) {  
                            targetSource = sources[1];  
                        }  
                        if (targetSource) {  
                            if (creep.harvest(targetSource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                                creep.moveTo(targetSource, {  
                                    visualizePathStyle: { stroke: '#ffffff' }  
                                });  
                            }  
                        }  
                    } 
                }  
            } else {  
                creep.memory.state = 'working';  
            }  
        } else if (creep.memory.state === 'working') {  
            if (creep.store[RESOURCE_ENERGY] > 0) {  
                        var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);  
                        if (constructionSites.length > 0) {  
                            let target = constructionSites[0];  
                            for (let i = 0; i < constructionSites.length; i++) {  
                                if (creep.pos.getRangeTo(constructionSites[i]) < creep.pos.getRangeTo(target)) {  
                                    target = constructionSites[i];  
                                }  
                            }  
                            if (creep.build(target) === ERR_NOT_IN_RANGE) {  
                                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });  
                            }  
                        } 
                }else {  
                    creep.memory.state = 'harvesting';  
                }  
            } 
        }
    };
module.exports = roleNewbuilder;