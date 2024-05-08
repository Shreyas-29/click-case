"use server";

import { db } from "@/lib/db";
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client";

export type SaveConfigProps = {
    configId: string;
    color: CaseColor;
    model: PhoneModel;
    finish: CaseFinish;
    material: CaseMaterial;
}

const saveConfig = async ({ color, material, finish, model, configId }: SaveConfigProps) => {
    try {
        await db.configuration.update({
            where: {
                id: configId,
            },
            data: {
                color,
                model,
                material,
                finish,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export default saveConfig;
