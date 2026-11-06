const{Service,Blog}=require('../models');const{z}=require('zod');
const safeUrl=z.union([z.literal(''),z.string().url().refine(x=>/^https:\/\//i.test(x))]).optional().nullable();
const shared={slug:z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),imageUrl:safeUrl,metaTitle:z.string().max(180).optional().nullable(),metaDescription:z.string().max(320).optional().nullable(),isPublished:z.boolean().optional()};
const schemas={services:z.object({...shared,name:z.string().trim().min(2).max(160),description:z.string().trim().min(10),content:z.string().optional().nullable(),icon:z.string().max(50).optional()}).strict(),blogs:z.object({...shared,title:z.string().trim().min(3).max(220),excerpt:z.string().max(1500).optional().nullable(),content:z.string().min(10),category:z.string().max(120).optional().nullable()}).strict()};
const models={services:Service,blogs:Blog};
function fail(res,err){if(err.name==='SequelizeUniqueConstraintError')return res.status(409).json({error:'Slug already exists'});if(err.name==='ZodError')return res.status(400).json({error:'Validation failed',details:err.flatten()});console.error(err);return res.status(500).json({error:'Server error'})}
exports.listPublic=type=>async(req,res)=>{try{res.json(await models[type].findAll({where:{isPublished:true},order:[['createdAt','DESC']]}))}catch(e){fail(res,e)}};
exports.publicOne=type=>async(req,res)=>{try{const item=await models[type].findOne({where:{slug:req.params.slug,isPublished:true}});if(!item)return res.status(404).json({error:'Not found'});res.json(item)}catch(e){fail(res,e)}};
exports.listAdmin=type=>async(req,res)=>{try{res.json(await models[type].findAll({order:[['updatedAt','DESC']]}))}catch(e){fail(res,e)}};
exports.getAdmin=type=>async(req,res)=>{try{const item=await models[type].findByPk(req.params.id);if(!item)return res.status(404).json({error:'Not found'});res.json(item)}catch(e){fail(res,e)}};
exports.create=type=>async(req,res)=>{try{const item=await models[type].create(schemas[type].parse(req.body));res.status(201).json(item)}catch(e){fail(res,e)}};
exports.update=type=>async(req,res)=>{try{const item=await models[type].findByPk(req.params.id);if(!item)return res.status(404).json({error:'Not found'});await item.update(schemas[type].partial().parse(req.body));res.json(item)}catch(e){fail(res,e)}};
exports.remove=type=>async(req,res)=>{try{const item=await models[type].findByPk(req.params.id);if(!item)return res.status(404).json({error:'Not found'});await item.destroy();res.status(204).send()}catch(e){fail(res,e)}};
