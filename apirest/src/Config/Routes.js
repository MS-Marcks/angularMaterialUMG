import { Router } from 'express'
import ControllerPerson from '../Controller/ControllerPerson'
import ControllerClient from '../Controller/ControllerClient'
import ControllerEmployeer from '../Controller/ControllerEmployeer'
import ControllerProduct from '../Controller/ControllerProduct'
import ControllerFact from '../Controller/ControllerFact'
import ControllerFactProducts from '../Controller/ControllerFactProducts'

const router = Router();

router.post("/login", ControllerPerson.Login)

router.post("/clientes", ControllerClient.Create)
router.get("/clientes/:id", ControllerClient.SearchSingle)
router.get("/clientes", ControllerClient.SearchAll)
router.put("/clientes/:id", ControllerClient.Update)
router.delete("/clientes/:id", ControllerClient.Delete)


router.post("/empleados", ControllerEmployeer.Create)
router.get("/empleados/:id", ControllerEmployeer.SearchSingle)
router.get("/empleados", ControllerEmployeer.SearchAll)
router.put("/empleados/:id", ControllerEmployeer.Update)
router.delete("/empleados/:id", ControllerEmployeer.Delete)

router.post("/productos", ControllerProduct.Create)
router.get("/productos/:id", ControllerProduct.SearchSingle)
router.get("/productos", ControllerProduct.SearchAll)
router.put("/productos/:id", ControllerProduct.Update)
router.delete("/productos/:id", ControllerProduct.Delete)

router.get("/clientes/:id/facturas", ControllerFact.SearchFactClient)
router.get("/empleados/:id/facturas", ControllerFact.SearchFactEmployee)
router.get("/facturas/:id", ControllerFact.SearchSingle)
router.post("/facturas", ControllerFact.Create)
router.put("/facturas/:id", ControllerFact.Update)
router.patch("/facturas/:id", ControllerFact.ChangeStatusFact)
router.delete("/facturas/:id", ControllerFact.Delete)

router.get("/facturas", ControllerFact.SearchFact)

router.post("/facturas/:id/detalle", ControllerFactProducts.Create)
router.get("/facturas/:id/productos", ControllerFactProducts.SearchSingle)
router.delete("/facturas/:id/detalle", ControllerFactProducts.Delete)

export default router;