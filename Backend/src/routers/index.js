import { Router } from "express";

import { router as newsletterRouter } from "./newsletter.js";
import { router as productRouter } from "./product.js";
import { router as categoryRouter } from "./category.js";
import { router as supplierRouter} from "./supplier.js";
import { router as promotionRouter } from "./promotion.js";
import { router as authRouter } from "./auth.js";
import { router as contactMessage } from "./contactMessage.js";
import { router as roleRouter } from "./role.js";

export const router = Router();

router.use('/newsletter', newsletterRouter);

router.use('/product', productRouter);

router.use('/category', categoryRouter);

router.use('/supplier', supplierRouter);

router.use('/promotion', promotionRouter);

router.use('/auth', authRouter);

router.use('/contact-message', contactMessage);

router.use('/role', roleRouter);

