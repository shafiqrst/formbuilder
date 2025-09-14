"use client";

import { useBuilderStore } from "@/lib/store";
import { useMemo } from "react";

const FormStats = () => {
    const { layout } = useBuilderStore();

    const { fieldCount, requiredCount } = useMemo(() => {
        const fields = layout.flatMap(row => row.columns.flatMap(col => col.fields));
        return {
            fieldCount: fields.length,
            requiredCount: fields.filter(f => f.required).length
        }
    }, [layout]);

    return (
        <div className="bg-white border rounded-lg p-3 mt-4">
            <h6 className="mb-3"><i className="fas fa-chart-bar me-2"></i>Form Statistics</h6>
            <div className="row text-center">
                <div className="col-6 border-end"><h4 className="text-primary mb-0">{fieldCount}</h4><small className="text-muted">Fields</small></div>
                <div className="col-6"><h4 className="text-success mb-0">{requiredCount}</h4><small className="text-muted">Required</small></div>
            </div>
        </div>
    );
};

export default FormStats;