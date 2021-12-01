const express = require('express');
const router = express.Router();

const project = require('../controller/project');

router.get('/all', project.listAllProject)
router.get('/one', project.listOneproject)
router.get('/', project.paginate)
router.post('/', project.createproject)
router.put('/:id', project.updateProject)
router.delete('/:id', project.deleteProject)


module.exports = router