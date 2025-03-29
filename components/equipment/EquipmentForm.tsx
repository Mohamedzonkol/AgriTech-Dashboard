"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { toast } from "sonner";
import type { Equipment } from "../../utils/types";

interface EquipmentFormProps {
    equipment: Equipment;
    onSave: (equipment: Equipment) => Promise<void>;
    onCancel: () => void;
    isEditing: boolean;
}

const EquipmentForm = ({ equipment, onSave, onCancel, isEditing }: EquipmentFormProps) => {
    const [formData, setFormData] = React.useState<Equipment>(equipment);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'battery' || name === 'hoursUsed' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSave(formData);
            toast.success(`Equipment ${isEditing ? 'updated' : 'added'} successfully!`);
        } catch (error) {
            toast.error(`Failed to ${isEditing ? 'update' : 'add'} equipment`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Equipment" : "Add Equipment"}</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name">Equipment Name</label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="battery">Battery Level (%)</label>
                            <Input
                                id="battery"
                                name="battery"
                                type="number"
                                value={formData.battery}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="hoursUsed">Hours Used</label>
                            <Input
                                id="hoursUsed"
                                name="hoursUsed"
                                type="number"
                                value={formData.hoursUsed}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="status">Status</label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => handleSelectChange('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                                    <SelectItem value="Idle">Idle</SelectItem>
                                    <SelectItem value="Error">Error</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastMaintenance">Last Maintenance</label>
                            <Input
                                id="lastMaintenance"
                                name="lastMaintenance"
                                type="date"
                                value={formData.lastMaintenance}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="connectivity">Connectivity</label>
                            <Select
                                value={formData.connectivity}
                                onValueChange={(value) => handleSelectChange('connectivity', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select connectivity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Online">Online</SelectItem>
                                    <SelectItem value="Offline">Offline</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EquipmentForm;